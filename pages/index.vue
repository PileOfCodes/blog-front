<template>
    <div>
        <LandingSlider  />
        <div class="md:flex lg:flex xl:gap-x-4 lg:pl-6">
            <div class="lg:relative">
                <div class="flex flex-col md:w-[240px] lg:w-[300px] md:shadow-lg rounded-md sticky top-24">
                    <LandingSideSection />
                </div>
            </div>
            <div class="lg:w-[1140px] lg:shadow-lg lg:rounded-lg ">
                <div :style="locale == 'fa' ? 'direction: rtl' : 'direction: ltr'" :class="[locale == 'fa' ? 'lg:text-right' : 'lg:text-left']" class="text-slate-800 lg:px-3 dark:text-white text-2xl text-center mt-8 font-bold md:mb-6 lg:mt-0">{{ $t('articles') }}</div>
                <!-- <LandingPosts /> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const {locale} = useI18n()
</script>