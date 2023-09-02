export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event,'login_token')
    const query = getQuery(event)

    try {
        const data = await $fetch(`${apiBase}${query.url}`,{
            method: 'PUT',
            body,
            headers: {
                "Accept" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        })
        return data.data
    } catch (error) {
        return error
    }
})