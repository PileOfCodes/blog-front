<template>
    <div class="relative">
        <div class="pl-8 pr-12 mt-20" :style="[locale == 'fa' ? 'direction: rtl' : 'direction: ltr']">
            <div class="flex gap-x-4">
                <div class="h-full w-full border-b-2 pb-8">
                    <div>
                        <div class="flex gap-x-2">
                            <NuxtLink :to="localePath(`/profile/${post.data.userName}`)" class="w-20 h-20 rounded-full overflow-hidden">
                                <UnLazyImage 
                                class="w-20 h-20 hover:scale-[115%] object-cover rounded-full duration-500 transition-all"
                                :src="post.data.userImage" 
                                blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
                                    auto-sizes 
                                />
                            </NuxtLink>
                            <div>
                                <div class="dark:text-white">{{ post.data.userName }}</div>
                                <div class="dark:text-gray-400 mt-2">{{ locale == 'fa' ? post.data.persianDate : post.data.englishDate }}</div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="dark:text-white mt-12 mb-8 text-2xl font-bold">{{ locale == 'fa' ? post.data.persianTitle : post.data.englishTitle }}</div>
                            <ClientOnly>
                                <div style="direction: ltr;" class="flex items-center gap-x-4 px-4 rounded-full py-2 font-bold dark:bg-white dark:text-slate-800">
                                    <div @click="likeArticle" class="tooltip" :data-tip="locale == 'fa' ? 'مورد پسند' : 'Favorite'">
                                        <div v-if="!likePending">
                                            <Icon :class="{'text-red-600' : isLiked}" class="cursor-pointer" size="28" name="solar:heart-bold" />
                                            <span :style="[locale == 'fa' ? 'font-family: IrsMedium' : 'font-family: sans-serif']">{{ articleLikes }}</span>
                                        </div>
                                    </div>
                                    <span class="text-2xl">|</span>
                                    <div class="tooltip" :data-tip="locale == 'fa' ? 'پاسخ ها' : 'comment'">
                                        <Icon size="28" name="uil:comment" />
                                        <span :style="[locale == 'fa' ? 'font-family: IrsMedium' : 'font-family: sans-serif']">{{ allComments.data.length }}</span>
                                    </div>
                                </div>
                            </ClientOnly>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <UnLazyImage 
                        class="xl:w-full xl:h-full sm:w-[540px] md:w-[480px] lg:w-[520px] w-[500px] h-[300px] duration-500 transition-all"
                        :src="post.data.image" 
                        blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
                        auto-sizes 
                        />
                    </div>
                    <div class="dark:text-white mt-12 text-justify leading-10">{{ locale == 'fa' ? post.data.persianBody : post.data.englishBody }}</div>
                    <div class="flex gap-x-4 mt-8 ">
                        <div v-for="category in post.data.categories" :key="category.id">
                            <span class="dark:text-slate-800 dark:bg-white py-2 px-3 ">{{ category.englishTitle }}</span>
                        </div>
                    </div>
                </div>
                <div class="relative flex flex-col justify-center w-[300px] ">
                    <div class="sticky top-[100px] ">
                        <div class="font-bold text-center dark:text-white text-2xl">{{ $t('related articles') }}</div>
                        <div>
                            <RelatedArticles @send-articles="(data) => relatedArticles = data" />
                        </div>
                        <div v-if="relatedArticles.length == 0" class="text-slate-800 dark:text-white p-2 text-center ">
                            {{ locale == 'fa' ? ' مقاله مرتبطی وجود ندارد! ' : 'There is no related article!' }}
                        </div>
                        <NuxtLink v-if="relatedArticles.length > 4 " :to="localePath('/categories')" :class="btnStyle">
                            {{ $t('all categories') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="mt-12 w-3/5">
                <div class="mb-12 dark:text-white text-xl font-bold ">{{ locale == 'fa' ? 'پاسخ ها' : 'comments' }}</div>
                <div class="my-8 dark:text-slate-800 dark:bg-white bg-slate-800 text-white shadow-md rounded-sm">
                    <div class="py-2 px-4 border-b-2 font-bold ">{{ locale == 'fa' ? 'دیدگاه خود را بنویسید' : 'write your comment' }}</div>
                    <textarea id="commentTextarea" ref="commentTextarea" v-model.trim="userComment" :placeholder="locale == 'fa' ? 'دیدگاه...' : 'comment...'" class="resize-none bg-slate-800 text-white dark:bg-white dark:text-slate-800 outline-none w-full border-none text-lg px-4 h-32 py-2 font-bold "></textarea>
                    <div class="flex justify-end">
                        <span v-if="pending" class="loading loading-dots loading-lg text-white dark:text-slate-800 ml-8 mb-2"></span>
                        <button v-else @click="sendComment" :disabled="disBtn"  class="px-4 py-3 border-2 bg-white text-slate-800 hover:bg-slate-800 hover:text-white hover:border-white border-white font-bold dark:bg-slate-800 dark:text-white dark:hover:border-slate-800 dark:hover:text-slate-800 dark:hover:bg-transparent rounded-sm my-2 mx-2 transition-all duration-150 ">{{ $t('send') }}</button>
                    </div>
                </div>
                <PostComment v-for="comment in comments.data" :key="comment.id" :comment="comment" />
            </div>
        </div>
        <div v-if="likePending">
            <div class="fixed z-[10000] top-0 left-0 bottom-0 w-full h-full bg-black flex items-center justify-center ">
                <span class="loading loading-infinity loading-big-spinner text-success"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useLikeStore} from '~/store/like'
import {useToast} from 'vue-toastification'
const btnStyle = ref('py-2 rounded-sm border-2 border-slate-800 dark:border-white hover:bg-slate-800 hover:text-white hover:dark:bg-white hover:dark:text-slate-800 dark:text-white mt-8 flex text-lg items-center justify-center lg:justify-center transition-all duration-300 font-bold')
const {locale} = useI18n()
const {public : {apiBase}} = useRuntimeConfig()
const route = useRoute()
const toast = useToast()
const pending = ref(false)
const likePending = ref(false)
const commentTextarea = ref('')
const likePost = useLikeStore()
const localePath = useLocalePath()
const {authUser} = useAuth()
const relatedArticles = ref([])

const isLiked = computed(() => likePost.getItem(authUser.value.id, route.params.slug))
const articleLikes = computed(() => likePost.articleLikes(route.params.slug))

async function likeArticle() {
    if(authUser.value) {
        try {
            likePending.value = true
            const data = await $fetch('/api/like/update', {
                method: 'POST',
                body: {slug: route.params.slug}
            })
            likePost.getPostLike(data)
        } catch (error) {
            
        }finally {
            likePending.value = false
        }
        
    }else {
        locale.value == 'fa' ? toast.info('برای پسند کردن ابتدا باید وارد وبلاگ شوید') : toast.info('you need to first login into weblog')
        setTimeout(() => {
            return navigateTo(localePath('/auth/login'))
        }, 3000);
    }
}


const {data: post} = await useFetch(`${apiBase}/posts/getPost`, {
    params: {slug: route.params.slug}
})

const {data: comments} = await useFetch(`${apiBase}/comment/articleComments`, {
    params: {slug: route.params.slug}
})

const {data: allComments} = await useFetch(`${apiBase}/comment/articleAllComments`, {
    params: {slug: route.params.slug}
})

const userComment = ref('')
const disBtn = ref(true)

watch(userComment, (newVal) => {
    if(newVal == '' || newVal == null) {
        disBtn.value = true
    }else {
        disBtn.value = false
    }
})

async function sendComment() {
    pending.value = true
    if(userComment.value == '') {
        return
    }
    try {
        await $fetch('/api/comment/create', {
            method: 'POST',
            body: {
                body: userComment.value,
                post_id: post.value.data.id
            }
        })
        toast.success('your comment added successfully')
    } catch (error) {

    } finally {
        pending.value = false
        userComment.value = ''
    }
}
</script>