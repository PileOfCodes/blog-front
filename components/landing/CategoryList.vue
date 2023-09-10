<template>
  <div class="text-2xl text-center font-bold mx-auto lg:mx-0" :class="[locale == 'fa' ? 'lg:text-right' : 'lg:text-left']">{{ $t('categories') }}</div>
  <div class="flex flex-wrap items-center justify-center lg:gap-y-8 lg:gap-x-4 gap-y-8 gap-x-4 lg:flex lg:flex-wrap mt-8 md:gap-x-2 md:gap-y-6 categoryList" :class="[locale == 'fa' ? 'lg:justify-end' : 'lg:justify-start']">
    <div v-for="category in categories.data" :key="category.id" :class="{'animateCategoryBox' : activateAnimation}">
      <NuxtLink :to="localePath(`/categories/${category.slug}`)" :class="categoryStyles">{{ locale == 'fa' ? category.persianTitle : category.englishTitle  }}</NuxtLink>
    </div>
  </div>
  <NuxtLink :to="localePath('/categories')" :class="btnStyle">
    {{ $t('all categories') }}
  </NuxtLink>
</template>

<script setup lang="ts">

const {locale} = useI18n()
const activateAnimation = ref(false)
const localePath = useLocalePath()
const categoryStyles = ref('dark:bg-slate-700 dark:hover:bg-white dark:hover:text-slate-800 px-4 py-2 transition-all duration-150 rounded-sm shadow-sm  shadow-slate-400 hover:bg-slate-700 hover:text-white dark:hover:shadow-slate-600 hover:shadow-xl dark:hover:shadow-md')
const btnStyle = ref('mx-auto w-1/2 md:w-full my-8 py-2 rounded-sm border-2 border-slate-800 dark:border-white hover:bg-slate-800 hover:text-white hover:dark:bg-white hover:dark:text-slate-800 dark:text-white mt-8 flex text-lg items-center justify-center lg:justify-center transition-all duration-300 font-bold')
const {public: {apiBase}} = useRuntimeConfig()
const {data: categories}: any = await useFetch(`${apiBase}/landing/getCategories`)
const observer = ref<IntersectionObserver | null>(null)

const setupObserver = () => {
  observer.value = new IntersectionObserver((entries) => {
    let entry = entries[0]
    if(entry.isIntersecting) {
      activateAnimation.value = true
    }
  })
  const category = document.querySelector('.categoryList') as HTMLDivElement | null
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
.animateCategoryBox {
    animation-name: categoryBox;
    animation-timing-function: ease-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(1) {
    animation-name: categoryBox;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(2) {
    animation-name: categoryBox;
    animation-delay: 100ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(3) {
    animation-name: categoryBox;
    animation-delay: 200ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(4) {
    animation-name: categoryBox;
    animation-delay: 300ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(5) {
    animation-name: categoryBox;
    animation-delay: 400ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(6) {
    animation-name: categoryBox;
    animation-delay: 500ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(7) {
    animation-name: categoryBox;
    animation-delay: 600ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(8) {
    animation-name: categoryBox;
    animation-delay: 700ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(9) {
    animation-name: categoryBox;
    animation-delay: 800ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(10) {
    animation-name: categoryBox;
    animation-delay: 900ms;
    opacity: 0;
}
.animateCategoryBox:nth-of-type(11) {
    animation-name: categoryBox;
    animation-delay: 1000ms;
    opacity: 0;
}
@keyframes categoryBox {
    from{opacity: 0; transform: translateX(-600px);}
    to{opacity: 1; transform: translateX(0px);}
}
</style>