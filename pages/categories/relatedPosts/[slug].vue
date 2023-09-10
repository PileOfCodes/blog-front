<template>
    <div class="min-h-[300px] my-20 flex">
        <div class="flex flex-col items-center justify-center gap-x-2 w-[400px]">
            <div class=" text-slate-800 dark:text-white text-xl font-bold">{{ locale == 'fa' ? 'مقالات مرتبط با دسته بندی های ' : 'Related articles to categories' }} </div>
            <div class="flex gap-x-4 flex-wrap">
              <div v-for="category in articles[0].categories">
                <NuxtLink :to="`/categories/${category.slug}`" class="group px-5 py-3 overflow-hidden rounded-md ">
                    <div class="transition-all duration-200 group-hover:font-bold group-hover:scale-[120%] px-4 py-2 text-slate-800  bg-slate-800 dark:bg-white dark:text-slate-800">{{ locale == 'fa' ? category.persianTitle : category.englishTitle }}</div>
                </NuxtLink>
              </div>
            </div>
        </div>
        <ClientOnly>
            <Swiper
            class="swiper-cards"
            :width="760"
            :modules="[SwiperAutoplay, SwiperEffectCards]"
            :slides-per-view="1"
            :loop="true"
            :effect="'cards'"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: true
            }"
            >
            <SwiperSlide
                v-for="article in articles"
                :key="article.id"
            >
            <NuxtLink :to="`/posts/${article.slug}`" class="w-full h-full">
              <img :src="article.image" :alt="article.id">
            </NuxtLink>
            </SwiperSlide>
            </Swiper>
        </ClientOnly>
    </div>
</template>


<script setup>
const {locale} = useI18n()
const route = useRoute()
const {public: {apiBase}} = useRuntimeConfig()
const {data: articles} = await $fetch(`${apiBase}/category/relatedArticles`, {
    params: {slug: route.params.slug}
})
</script>

<style>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 60vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}
.swiper-cards {
  width: 760px;
  height: 400px;
}
.swiper-cards .swiper-slide {
  border-radius: 6px;
  border: 1px solid black;
}
</style>