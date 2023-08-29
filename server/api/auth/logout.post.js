export default defineEventHandler(async (event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event, 'login_token')
    try {
        const data = await $fetch(`${apiBase}/auth/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        setCookie(event,'login_token', '',{
            secure: true,
            httpOnly: true,
            maxAge: new Date(0),
            path: '/'
        })
        return data
    } catch (error) {
        return error
    }
})