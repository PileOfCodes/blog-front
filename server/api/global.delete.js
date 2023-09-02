export default defineEventHandler(async (event) => {
    const {public: {apiBase}} = useRuntimeConfig()
    const token = getCookie(event,'login_token')
    const query = getQuery(event)

    try {
        const data = await $fetch(`${apiBase}${query.url}`,{
            method: 'DELETE',
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