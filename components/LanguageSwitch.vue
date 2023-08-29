<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
    return locales.value.filter((i: { code: string }) => i.code !== locale.value) as any[];
})
</script>

<template>
    <div class="transition-all duration-300">
        <NuxtLink class="flex items-center gap-x-1 text-slate-900 dark:text-white" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
            <Icon size="27" class="text-slate-800 dark:text-white" name="uil:globe" />
            {{locale.name}}
        </NuxtLink>
    </div>
</template>