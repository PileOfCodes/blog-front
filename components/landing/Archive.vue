<template>
    <div :style="[locale == 'fa' ? 'direction: rtl' : 'direction: ltr']" class="flex w-full items-center justify-center mt-4">
        <select @change="pickDate" id="archive" class="select select-bordered rounded-sm text-lg w-full max-w-xs dark:text-slate-800">
            <option disabled selected class="text-center">{{ $t('released year') }}</option>
            <option class="text-center" v-for="date in archive" :key="date.id">{{ selectedDate = date.date }}</option>
        </select>
    </div>
</template>

<script setup>
const {locale} = useI18n()
const localePath = useLocalePath()
const selectedDate = ref(null)
const router = useRouter()
const {public: {apiBase}} = useRuntimeConfig()
const {data: archive} = await $fetch(`${apiBase}/landing/archive`)
async function pickDate() {
    router.push(localePath(`/posts/archive/${selectedDate.value}`))
}
</script>