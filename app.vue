<template>
  <div>
    <NuxtLayout >
      <VitePwaManifest />
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

useHead({
  titleTemplate: (title) => {
    return title ? ` ${title} | وبلاگ مجموعه مقالات توسعه وب ` : ' وبلاگ مجموعه مقالات توسعه وب '
  }
})
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