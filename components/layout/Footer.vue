<template>
    <div class="dark:text-white border-t-[1px] dark:border-t-[1px] mt-12 transition-all duration-300 flex items-center justify-between px-20 py-8">
        <div class="dark:text-slate-400 font-bold text-slate-600 text-sm" :style="[locale == 'fa' ? '' : 'font-family: sans-serif']">
            © PileOfCodes 2023-2024
        </div>
        <div class="lg:flex lg:gap-x-2">
            <NuxtLink to="#">
                <Icon size="28" name="uil:instagram" />
            </NuxtLink>
            <NuxtLink to="#">
                <Icon size="28" name="uil:telegram" />
            </NuxtLink>
            <NuxtLink to="#">
                <Icon size="28" name="uil:linkedin" />
            </NuxtLink>
            <NuxtLink to="#">
                <Icon size="28" name="uil:github" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const {locale} = useI18n()
</script>