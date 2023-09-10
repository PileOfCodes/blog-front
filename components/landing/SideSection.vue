<template>
    <div class="dark:text-white my-8 px-4 transition-all duration-300  lg:my-0 lg:px-2">
        <LandingCategoryList />
        <div>
            <div class="font-bold text-center mx-auto lg:mx-0 lg:mt-8" :class="[locale == 'fa' ? 'lg:text-right text-xl' : 'lg:text-left text-2xl']">{{ $t('new articles') }}</div>
            <LandingNewPost />
        </div>
        <div>
            <div class="font-bold mt-8 text-center mx-auto lg:mx-0 lg:mt-8" :class="[locale == 'fa' ? 'lg:text-right text-xl' : 'lg:text-left text-2xl']">{{ $t('most viewed') }}</div>
            <LandingMostViewed />
        </div>
        <div>
            <div class="font-bold mt-8 text-center mx-auto lg:mx-0 lg:mt-8" :class="[locale == 'fa' ? 'lg:text-right text-xl' : 'lg:text-left text-2xl']">{{ $t('most favorite') }}</div>
            <LandingMostFavorite />
        </div>
    </div>
</template>

<script setup lang="ts">
const {locale} = useI18n()
</script>

<style></style>