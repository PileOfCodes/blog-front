export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {public : {apiBase}} = useRuntimeConfig()

    const data = await $fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        body,
        headers: {
            'Accept': 'application/json'
        }
    })

    if(data.status == 200) {
        setCookie(event, 'login_token', data.data.login_token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        })
        return data
    }else {
        return data
    }

})