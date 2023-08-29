<template>
    <div @click="emit('toggleMenu', !props.closeMenu)" class="menu-btn">
        <div class="menu-btn__burger bg-slate-800 dark:bg-white before:dark:bg-white after:dark:bg-white"></div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    'closeMenu' : boolean
}>()
const emit = defineEmits<{
    (e: 'toggleMenu', entry: boolean) : void
}>()
onMounted(() => {
   const menuBtn = document.querySelector('.menu-btn') as any
   let menuOpen = false
   menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open')
        menuOpen = true
    }else {
        menuBtn.classList.remove('open')
        menuOpen = false
    }
   })
})
</script>

<style>
.menu-btn {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.menu-btn__burger {
    width: 44px;
    height: 6px;
    background-color: rgb(30 41 59 / 1);
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
}
.menu-btn__burger::after,
.menu-btn__burger::before {
    content: '';
    position: absolute;
    width: 44px;
    height: 6px;
    border-radius: 4px;
    background-color: rgb(30 41 59 / 1);
    transition: all 0.3s ease-in-out;
}
.menu-btn__burger::before {
    transform: translateY(-10px);
}
.menu-btn__burger::after {
    transform: translateY(10px);
}
.menu-btn.open .menu-btn__burger {
    transform: translateX(-30px);
    background-color: transparent;
    box-shadow: none;
}
.menu-btn.open .menu-btn__burger::after {
    transform: rotate(45deg) translate(35px, -35px);
}
.menu-btn.open .menu-btn__burger::before {
    transform: rotate(-45deg) translate(35px, 35px);
}
</style>