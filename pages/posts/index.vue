<template>
    <div>
        <FilterSection @send-search-item="(input) => searchItem = input" />
        <div class="mt-20 px-8 flex items-center justify-center xl:gap-x-10 xl:gap-y-10 flex-wrap min-h-[200px]">
            <div v-for="post in posts" :key="post.id" class="group">
                <NuxtLink :to="localePath(`/posts/${post.slug}`)" class="relative" :style="[locale == 'fa' ? 'font-family: irsMedium' : 'font-family: sans-serif']">
                    <div :style="[locale == 'fa' ? 'direction:rtl' : 'direction:ltr']" class="text-slate-800 dark:text-white  font-bold transition-all duration-300">
                        <div :class="[locale == 'fa' ? 'absolute bottom-[10%] sm:bottom-[5%] right-2 ' : 'absolute bottom-[10%] sm:bottom-[5%] left-2 ']" class="opacity-0 text-sm w-[240px] lg:text-sm lg:w-[240px] xl:w-[300px] md:text-xs md:w-[100px] truncate group-hover:opacity-100 font-bold group-hover:duration-500 transition-all sm:truncate">{{ locale == 'fa' ? post.persianTitle : post.englishTitle}}</div>
                        <div :class="[locale == 'fa' ? 'absolute bottom-[10%] left-2 sm:bottom-[5%] sm:left-2' : 'absolute bottom-[10%] sm:bottom-[5%] right-2']" class="opacity-0 text-sm sm:text-xs group-hover:opacity-100 font-bold group-hover:duration-500 transition-all dark:text-slate-400 text-slate-600">{{ locale == 'fa' ? post.persianDate : post.englishDate }}</div>
                    </div>
                    <div style="direction: ltr;"
                        class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 transition-all absolute top-[50%] left-[38%] translate-x-[-38%] translate-y-[-50%] dark:text-white">
                            <Icon size="28" name="solar:heart-bold" />
                            <span>{{ post.likes_count }}</span>
                    </div>
                    <div style="direction: ltr;"
                        class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 transition-all absolute top-[50%] left-[62%] translate-x-[-62%] translate-y-[-50%] dark:text-white">
                        <Icon size="28" name="uil:comment" />
                            <span>{{ post.comments_count }}</span>
                    </div>
                    <div class="rounded-sm hover:opacity-10 w-full h-full group-hover:opacity-100 group-hover:border-2 group-hover:border-slate-800 group-hover:dark:border-white group-hover:duration-500 group-hover:transition-all overflow-hidden ">
                    <UnLazyImage 
                        class="group-hover:opacity-10 xl:w-[620px] xl:h-[400px] sm:w-[540px] md:w-[480px] lg:w-[520px] w-[500px] h-[300px] object-cover hover:scale-[120%] duration-500 transition-all"
                        :src="post.image" 
                        blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
                        auto-sizes 
                        />
                    </div>
                </NuxtLink>
            </div>
        </div>
        <ObserveArticles v-if="enableObserver"  @intersect="getPosts" />
        <div v-if="notFound" class="text-slate-800 dark:text-white font-bold text-2xl text-center ">{{ locale == 'fa' ? ' موردی یافت نشد ' : 'Not found anything' }}</div>
        <div class="flex items-center justify-center mt-8">
            <span v-if="pending" class="loading loading-dots loading-lg dark:text-white"></span>
        </div>
    </div>
</template>

<script setup lang="ts">

import { debounce } from 'lodash';
const localePath = useLocalePath()
const searchItem = ref('')
const {locale} = useI18n()
const {public: {apiBase}} = useRuntimeConfig()
const page = ref(1)
const posts = ref<any>([])
const lastPage = ref(1)
const currentPage = ref(1)
const pending = ref(false)
const notFound = ref(false)
const enableObserver = ref(true)

const getPosts = async() => {
    try {
        pending.value = true
        const {data} : any = await useFetch(`${apiBase}/getPosts`, {
            query: {page: page.value}
        })
        currentPage.value = data.value.data.meta.current_page
        lastPage.value = data.value.data.meta.last_page
        page.value = currentPage.value
        if(page.value <= lastPage.value) {
            if(page.value === 1) {
                posts.value = [...data.value.data.posts]
            }else {
                posts.value = [...posts.value, ...data.value.data.posts]
            }
            page.value++
        }
    } catch (error) {
        
    }finally {
        pending.value = false
    }
}

const getSearchedPosts = async() => {
    const {data} : any = await useFetch(`${apiBase}/getPosts`, {
        query: {search: searchItem.value}
    })
    posts.value = data.value.data.posts
    if (posts.value.length == 0) {
        notFound.value = true
    }else {
        notFound.value = false
    }
}

watch(searchItem, debounce(() => {    
    if(searchItem.value == '') {
        notFound.value = false
        enableObserver.value = true
        page.value = 1
        getPosts()
    }else {
        enableObserver.value = false
        getSearchedPosts()
    }
}, 700))

</script>