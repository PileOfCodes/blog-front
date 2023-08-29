<template>
    <div id="headerSecondList" class="sticky top-0 h-[50px] bg-white dark:bg-slate-800 animateHeaderSecondList flex items-center gap-x-12 py-2 px-4 md:px-8 dark:text-white shadow-md">
        <div class="text-2xl font-bold">
            <NuxtLink :to="localePath('/')">PileOFCodes</NuxtLink>
        </div>
        <div class="flex items-center gap-x-6 flex-wrap w-min-[200px]">
            <NuxtLink to="#" class="item2">{{ $t('top topics') }}</NuxtLink>
            <NuxtLink to="#" class="item3">{{ $t('developers') }}</NuxtLink>
            <NuxtLink to="#" class="item3">{{ $t('design') }}</NuxtLink>
            <NuxtLink to="#" class="item4">{{ $t('frontend') }}</NuxtLink>
            <NuxtLink to="#" class="item5">{{ $t('backend') }}</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
onMounted(() => {
    const secondList = document.getElementById('headerSecondList') as HTMLDivElement
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            secondList.classList.add('hideList')
        }else if(window.scrollY < 50) {
            secondList.classList.remove('hideList')
        }        
    })
})
</script>

<style>
.hideList {
    animation: hideSecondList 300ms ease-in forwards 1 ;
}
@keyframes hideSecondList {
    from{opacity: 1;}
    to{opacity: 0;transform: translateX(-800px);}
}
.animateHeaderSecondList div:first-child {
    animation-name: secondListBrand;
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
}
@keyframes secondListBrand {
    from{opacity: 0; transform: translateX(-200px);}
    to{opacity: 1;  transform: translateX(0px);}
}
.animateHeaderSecondList div:nth-child(2) .item1 {
    animation-name: secondListLink1;
    transform: translateX(-400px);
    animation-fill-mode: forwards;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
}
.animateHeaderSecondList div:nth-child(2) .item2 {
    animation-name: secondListLink2;
    transform: translateX(-500px);
    animation-fill-mode: forwards;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-delay: 200ms;
}
.animateHeaderSecondList div:nth-child(2) .item3 {
    animation-name: secondListLink3;
    animation-duration: 1s;
    transform: translateX(-600px);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-delay: 400ms;
}
.animateHeaderSecondList div:nth-child(2) .item4 {
    animation-name: secondListLink4;
    animation-duration: 1s;
    transform: translateX(-700px);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-delay: 600ms;
}
.animateHeaderSecondList div:nth-child(2) .item5 {
    animation-name: secondListLink5;
    animation-duration: 1s;
    transform: translateX(-800px);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-delay: 800ms;
}
@keyframes secondListLink1 {
    from{opacity: 0; transform: translateX(-400px);}
    to{opacity: 1;  transform: translateX(0px);}
}
@keyframes secondListLink2 {
    from{opacity: 0; transform: translateX(-500px);}
    to{opacity: 1;  transform: translateX(0px);}
}
@keyframes secondListLink3 {
    from{opacity: 0; transform: translateX(-600px);}
    to{opacity: 1;  transform: translateX(0px);}
}
@keyframes secondListLink4 {
    from{opacity: 0; transform: translateX(-700px);}
    to{opacity: 1;  transform: translateX(0px);}
}
@keyframes secondListLink5 {
    from{opacity: 0; transform: translateX(-800px);}
    to{opacity: 1;  transform: translateX(0px);}
}
</style>