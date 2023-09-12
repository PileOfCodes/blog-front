<template>
    <div v-for="(post, index) in posts" :style="[locale == 'fa' ? 'direction: rtl; font-family: irsMedium' : 'direction: ltr;font-family: sans-serif']"
    :key="index" class="flex flex-col items-center gap-y-12 sm:flex sm:justify-center sm:flex-row sm:flex-wrap md:justify-center md:gap-2 xl:flex xl:flex-wrap xl:gap-x-2 xl:mb-2">
        <div v-for="article in post" :key="article.id" class="group">
            <NuxtLink :to="localePath(`/posts/${article.slug}`)" class="relative" :style="[locale == 'fa' ? 'font-family: irsMedium' : 'font-family: sans-serif']">
                <div :style="[locale == 'fa' ? 'direction:rtl' : 'direction:ltr']" class="text-slate-800 dark:text-white  font-bold transition-all duration-300">
                    <div :class="[locale == 'fa' ? 'absolute bottom-[10%] sm:bottom-[5%] right-2 ' : 'absolute bottom-[10%] sm:bottom-[5%] left-2 ']" class="opacity-0 text-sm w-[240px] lg:text-sm lg:w-[240px] xl:w-[300px] md:text-xs md:w-[100px] truncate group-hover:opacity-100 font-bold group-hover:duration-500 transition-all sm:truncate">{{ locale == 'fa' ? article.persianTitle : article.englishTitle}}</div>
                    <div :class="[locale == 'fa' ? 'absolute bottom-[10%] left-2 sm:bottom-[5%] sm:left-2' : 'absolute bottom-[10%] sm:bottom-[5%] right-2']" class="opacity-0 text-sm sm:text-xs group-hover:opacity-100 font-bold group-hover:duration-500 transition-all dark:text-slate-400 text-slate-600">{{ locale == 'fa' ? article.persianDate : article.englishDate }}</div>
                </div>
                <div style="direction: ltr;"
                    class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 transition-all absolute top-[50%] left-[38%] translate-x-[-38%] translate-y-[-50%] dark:text-white">
                        <Icon size="28" name="solar:heart-bold" />
                        <span>{{ article.likes_count }}</span>
                </div>
                <div style="direction: ltr;"
                    class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 transition-all absolute top-[50%] left-[62%] translate-x-[-62%] translate-y-[-50%] dark:text-white">
                        <Icon size="28" name="uil:comment" />
                        <span>{{ article.comments_count }}</span>
                </div>
                <div class="rounded-sm hover:opacity-10 group-hover:opacity-100 group-hover:border-2 group-hover:border-slate-800 group-hover:dark:border-white group-hover:duration-500 group-hover:transition-all overflow-hidden w-[460px] h-[300px] sm:w-[600px] sm:h-[400px] md:w-[360px] md:h-[320px] xl:w-[480px] xl:h-[340px] ">
                    <UnLazyImage 
                    :class="newestPostImageStyle"
                    :src="article.image" 
                    blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
                    auto-sizes 
                    />
                </div>
            </NuxtLink>
        </div>
    </div>
    <div class="mt-8 flex items-center justify-center">
        <span v-if="pending" class="loading loading-dots loading-lg dark:text-white"></span>
        <button v-else-if="page != lastPage" class="dark:text-white dark:border-white font-bold border-2 border-slate-800 hover:bg-slate-800 hover:text-white rounded-sm px-4 py-2 dark:hover:bg-white dark:hover:text-slate-800 transition-all duration-300 " @click="loadMore">{{ $t('more articles') }}</button>
    </div>
</template>

<script setup>
const {locale} = useI18n()
const localePath = useLocalePath()
const newestPostImageStyle = ref('animatedPostImage w-full hover:opacity-10 object-cover rounded-sm w-[460px] h-[300px] sm:w-[600px] sm:h-[400px] md:w-full xl:w-[480px] xl:h-[340px] group-hover:scale-[120%] group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out transition-all duration-500')
const {public: {apiBase}} = useRuntimeConfig()
const posts = ref([])
const page = ref(1)
const lastPage = ref(1)
const pending = ref(false)


const loadPosts = async() => {
    pending.value = true
    try {
        let {data} = await useFetch(`${apiBase}/getPosts`, {
            query: {page: page.value}
        })
        posts.value.push(data.value.data.posts)
        lastPage.value = data.value.data.meta.last_page
        
    } catch (error) {
        
    }finally {
        pending.value = false
    }
}

const loadMore = () => {
    if(page.value < lastPage.value) {
        // pending.value = true
        page.value = page.value + 1
        loadPosts()
        // setTimeout(() => {
        //     pending.value = false
        // }, 2000)        
    } 
}
loadPosts()

</script>

<style>
.animatedPostImage {
    animation-name: postImage;
    animation-timing-function: ease-in-out;
    animation-duration: 700ms;
    animation-iteration-count: 1;
}
@keyframes postImage {
    from{opacity: 0;}
    to{opacity: 1;}
}
</style>