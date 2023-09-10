<template>
    <div class="min-h-[300px] my-20">
      <div class=" text-slate-800 dark:text-white text-center mb-20 text-4xl font-bold">{{ $t('category') }}: {{ locale == 'fa' ? category.persianTitle : category.englishTitle }}</div>
        <ClientOnly>
            <Swiper
            class="swiper-cards w-[420px] sm:w-[580px] sm:h-[50vh] md:h-[60vh] md:w-[720px]"
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
              <img :src="article.image" class="sm:h-[50vh] md:h-[60vh] w-full" :alt="article.id">
            </NuxtLink>
            </SwiperSlide>
            </Swiper>
        </ClientOnly>
    </div>
</template>

<script setup>
const {locale} = useI18n()
const route = useRoute()
const {public : {apiBase}} = useRuntimeConfig()
const {data: articles} = await $fetch(`${apiBase}/category/getArticles`, {
  params: {slug: route.params.slug}
})
const {data: category} = await $fetch(`${apiBase}/category/getCategory`, {
  params: {slug: route.params.slug}
})

</script>

<style>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}
.swiper-cards .swiper-slide {
  border-radius: 6px;
  border: 1px solid black;
}
</style>