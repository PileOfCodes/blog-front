<template>
    <div ref="root" class="mt-20"></div>
</template>

<script setup lang="ts">
const observer = ref<IntersectionObserver | null>(null)
const root = ref<any>(null)
const props = defineProps({
    options: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['intersect'])
onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
        let entry = entries[0]
        if(entry.isIntersecting) {
            emit('intersect')
        }
    }, props.options)
    observer.value.observe(root.value)
})
onUnmounted(() => {
    if(observer.value) {
        observer.value.disconnect()
    }
})
</script>