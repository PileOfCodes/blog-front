<template>
    <div class="my-20 min-h-[400px] px-32">
        <div class="text-slate-800 dark:text-white text-center mb-20 text-4xl font-bold">{{ $t('categories') }}</div>
        <div class="flex justify-center flex-wrap gap-12 items-center">
            <div v-for="category in categories" :key="category.id">
                <NuxtLink :to="localePath(`/categories/${category.slug}`)" class="group">
                    <div class="group w-[200px] overflow-hidden h-[100px] rounded-md">
                        <div class="transition-all duration-150 group-hover:scale-[120%] hover:dark:bg-white hover:dark:text-slate-800 border-2 border-slate-800 hover:bg-slate-800 hover:text-white dark:border-white text-slate-800 rounded-md font-bold text-lg text-center dark:text-white shadow-md w-[200px] overflow-hidden h-[100px] py-8 px-4 animateCategoryIndex">
                            <span class="group-hover:text-3xl transition-all duration-150">{{ locale == 'fa' ? category.persianTitle : category.englishTitle }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </div> 
        </div>
    </div>
</template>


<script setup>
const {locale} = useI18n()
const localePath = useLocalePath()
const {public : {apiBase}} = useRuntimeConfig()
const {data: categories} = await $fetch(`${apiBase}/category/index`)
</script>

<style>
.animateCategoryIndex {
    animation-name: categoryIndex;
    animation-timing-function: ease-in;
    animation-duration: 700ms;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
@keyframes categoryIndex {
    from{opacity: 0;}
    to{opacity: 1;}
}
</style>