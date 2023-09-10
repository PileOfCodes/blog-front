<template>
    <div :class="[locale == 'fa' ? 'md:items-end' : 'md:items-start']" class="mt-4 flex flex-wrap items-center justify-center gap-y-8 sm:gap-2 md:my-2 md:flex md:flex-col articleSection2">
        <div v-for="article in articles" :key="article.id" :class="['group',{'animateArticleBox2':showCategoryItems}]">
            <NuxtLink :to="`/posts/${article.slug}`" class="relative" :style="[locale == 'fa' ? 'font-family: irsMedium' : 'font-family: sans-serif']">
                <div :style="[locale == 'fa' ? 'direction:rtl' : 'direction:ltr']" class="text-slate-800 dark:text-white  font-bold transition-all duration-300">
                    <div :class="[locale == 'fa' ? 'absolute bottom-[10%] sm:bottom-[5%] right-2 ' : 'absolute bottom-[10%] sm:bottom-[5%] left-2 ']" class="opacity-0 text-sm lg:text-xs md:text-xs lg:w-[140px] md:w-[100px] w-[240px] truncate group-hover:opacity-100 font-bold group-hover:duration-500 transition-all sm:truncate">{{ locale == 'fa' ? article.persianTitle : article.englishTitle }}</div>
                    <div :class="[locale == 'fa' ? 'absolute bottom-[10%] left-2 sm:bottom-[5%] sm:left-2' : 'absolute bottom-[10%] sm:bottom-[5%] right-2']" class="opacity-0 text-sm sm:text-xs group-hover:opacity-100 font-bold group-hover:duration-500 transition-all dark:text-slate-400 text-slate-600">{{ locale == 'fa' ? article.persianDate : article.englishDate }}</div>
                </div>
                <div style="direction: ltr;"
                class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 transition-all absolute top-[50%] left-[38%] translate-x-[-38%] translate-y-[-50%] dark:text-white">
                    <Icon size="28" name="solar:heart-bold" />
                    <span>{{ article.likes_count }}</span>
                </div>
                <div style="direction: ltr;"
                class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 group-hover:transition-all duration-500 absolute top-[50%] left-[62%] translate-x-[-62%] translate-y-[-50%] dark:text-white">
                    <Icon size="28" name="uil:comment" />
                    <span>{{ article.comments_count }}</span>
                </div>
                <div class="rounded-sm hover:opacity-10 group-hover:opacity-100 group-hover:border-2 group-hover:border-slate-800 group-hover:dark:border-white  group-hover:duration-500 group-hover:transition-all overflow-hidden w-[460px] max-h-[200px] sm:max-w-[300px] sm:h-[240px] md:w-[220px] lg:w-[280px] md:h-[100px] md:rounded-lg">
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
</template>

<script setup lang="ts">
const {locale} = useI18n()
const route = useRoute()
const {public : {apiBase}} = useRuntimeConfig()
const articles = ref<any>(null)
const newestPostImageStyle = ref('w-full h-full hover:opacity-10 md:object-cover md:shadow-md group-hover:scale-[105%] md:shadow-slate-600 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out transition-all duration-500')

const data: any = await useFetch(`${apiBase}/landing/mostVisit`, {
    params: {slug: route.params.slug}
})

articles.value = data.data.value.data

const showCategoryItems = ref(false);
const observer = ref<IntersectionObserver | null>(null)
const setupObserver = () => {
    observer.value = new IntersectionObserver((entries) => {
        let entry = entries[0]
        if(entry.isIntersecting) {
            showCategoryItems.value = true
        }
    })
    const category = document.querySelector('.articleSection2') as HTMLDivElement | null
    if(category) {
        observer.value.observe(category)
    }
}
onMounted(() => {
    setupObserver()
})
onBeforeUpdate(() => {
    setupObserver()
})
onUnmounted(() => {
    if(observer.value) {
        observer.value.disconnect()
    }
})
</script>

<style>
.animateArticleBox2 {
    animation-name: articleBox2;
    animation-timing-function: ease-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    opacity: 0;
}
.animateArticleBox2:nth-of-type(1) {
    animation-name: articleBox2;
    opacity: 0;
}
.animateArticleBox2:nth-of-type(2) {
    animation-name: articleBox2;
    animation-delay: 300ms;
    opacity: 0;
}
.animateArticleBox2:nth-of-type(3) {
    animation-name: articleBox2;
    animation-delay: 500ms;
    opacity: 0;
}
.animateArticleBox2:nth-of-type(4) {
    animation-name: articleBox2;
    animation-delay: 700ms;
    opacity: 0;
}
@keyframes articleBox2 {
    from{opacity: 0; transform: translateX(-600px);}
    to{opacity: 1; transform: translateX(0px);}
}
</style>