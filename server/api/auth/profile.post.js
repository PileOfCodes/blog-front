import { readFiles } from 'h3-formidable'
import FormData from 'form-data'
import fs from 'fs'

export default defineEventHandler(async (event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event, 'login_token')
    const { fields, files } = await readFiles(event, {
        includeFields: true 
    })

    try {
        const formData = new FormData()
        formData.append('name', fields.name[0])
        formData.append('email', fields.email[0])
        formData.append('password', fields.password[0])
        formData.append('image', fs.createReadStream(files.image[0].filepath))
        const data = await $fetch(`${apiBase}/auth/profile`, {
        method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        return data.data;
    } catch (error) {
        return error
    }
})