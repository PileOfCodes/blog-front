<template>
    <div :style="[locale == 'fa' ? 'direction: rtl' : 'direction: ltr']" class="flex w-full items-center justify-center mt-4">
        <select id="archive" class="select select-bordered rounded-sm text-lg w-full max-w-xs dark:text-slate-800">
        <option disabled selected class="text-center">{{ $t('released year') }}</option>
        <option class="text-center">2023</option>
        </select>
    </div>
</template>

<script setup lang="ts">
const {locale} = useI18n()
</script>