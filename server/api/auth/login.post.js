export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {public: {apiBase}} = useRuntimeConfig()
    const data = await $fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        body,
        headers: {
            'Accept': 'application/json'
        }
    })
    if(data.status == 200) {
        setCookie(event, 'login_token', data.data.login_token, {
            maxAge: 60 * 24 * 60 * 60,
            secure: true,
            httpOnly: true,
            path: '/'
        })
        return data
    }else {
        console.log(data);
        return data
    }

})