export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {public : {apiBase}} = useRuntimeConfig()

    try {
        const data = await $fetch(`${apiBase}/auth/register`, {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json'
            }
        })

        setCookie(event, 'login_token', data.data.login_token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        })
        return 'data';
    } catch (error) {
        return error;
    }
})