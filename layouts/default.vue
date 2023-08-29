<template>
    <div>
        <LayoutHeader />
        <div @click="scrollToTop" class="z-10 fixed bottom-4 shadow-slate-600 shadow-md cursor-pointer left-4 w-12 h-12 rounded-full bg-slate-800 dark:bg-white flex items-center justify-center transition-all duration-300">
            <Icon size="28" class="text-white dark:text-black" name="uil:angle-up" />
        </div>
        <slot/>
        <LayoutFooter />
    </div>
</template>

<script setup lang="ts">
 
 function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
 }
</script>