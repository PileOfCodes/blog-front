export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {public: {apiBase}} = useRuntimeConfig()
    try {
        const data = await $fetch(`${apiBase}/auth/login`, {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json'
            }
        })
        setCookie(event, 'login_token', data.data.login_token, {
            maxAge: 60 * 24 * 60 * 60,
            secure: true,
            httpOnly: true,
            path: '/'
        })
        return "login data";
    } catch (error) {
        return error
    }
})