import {defineStore} from 'pinia'

export const useLikeStore = defineStore('like', {
    state: () => {
        return {
            like: []
        }
    },
    getters: {
        getItem: (state) => {
            return (userId, slug) => {
                const item = state.like.find(item => item.user_id == userId && item.post.slug == slug)
                if(item){
                    return item.isLiked
                }else {
                    return false
                }
            }
        },
        articleLikes: (state) => {
            return (slug) => {
                const likedArticle = state.like.filter(item => item.post.slug == slug && item.isLiked == true)
                return likedArticle.length
            }
        }
    },
    persist: {
        storage: persistedState.localStorage,
        key: 'weblog-like'
    },
    actions: {
        getPostLike(data) {
            const item = this.like.find(like => like.user_id == data.user_id && like.post.slug == data.post.slug)
            if(item){
                item.isLiked = data.isLiked
            }else{
                this.like.push({...data})
            }
        },
    }
})