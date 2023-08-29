<template>
    <div class="mt-12 flex items-center justify-center">
        <div class="flex">
            <div class="flex items-center border-2 bg-slate-800 border-slate-800 dark:border-white dark:bg-white p-3 rounded-tl-md rounded-bl-md">
                <Icon size="24" class="text-white dark:text-slate-800 dark:text-slate-800 " name="uil:search" />
            </div>
            <input id="searchArticles" :style="[locale == 'fa' ? 'direction: rtl' : 'direction: ltr']" ref="searchInput" type="text" :placeholder="$t('search for articles')" v-model="search" class=" bg-transparent border-2 text-lg py-4 px-2 outline-0 focus:dark:border-white xl:w-[400px] focus:border-slate-800 font-bold rounded-br-md rounded-tr-md dark:text-white dark:border-gray-600">
        </div>
    </div>
</template>

<script setup lang="ts">
const search = ref('')
const {locale} = useI18n()
const searchInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits<{
    (e: 'sendSearchItem', item: string) : void
}>()
watchEffect(() => {
    emit('sendSearchItem', search.value)
})
onMounted(() => searchInput.value?.focus())

</script>