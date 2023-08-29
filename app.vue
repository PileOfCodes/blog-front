<template>
  <div>
    <NuxtLayout >
      <NuxtLoadingIndicator />
      <NuxtPage :transition="{
      name: 'my',
      mode: 'out-in',
      onBeforeEnter
      }" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}
</script>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-slate-800 ;
}
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>