<template>
    <div class="my-8 p-4 shadow-md flex flex-col dark:text-white lg:flex-row sm:mr-4 md:mr-4 md:my-20 md:gap-x-4 md:p-4 lg:h-[550px]">
        <div :style="[locale == 'fa' ? 'direction: rtl' : 'direction: ltr']" class="">
            <div :class="[locale == 'fa' ? 'font-bold text-5xl' : 'text-6xl']">{{ $t('events') }}</div>
            <div :class="[locale == 'fa' ? 'text-[15px] leading-8' : '']" class="my-4 font-bold max-w-[320px]">{{ $t('the latest events') }}</div>
            <div v-for="(item, index) in items" :key="index" class="flex justify-between lg:flex lg:flex-col">
                <div v-if="index == selectedItem" class="animatedSliderText lg:mt-52">{{ locale == 'fa' ? item.persianTitle : item.englishTitle }}</div>
                <div v-if="index == selectedItem" class="animatedSliderText text-sm dark:text-slate-400 text-slate-600 lg:mt-2" style="font-family: sans-serif;">{{ item.createdAt }}</div>
            </div>
        </div>
        <div class="mt-2 min-w-[460px] h-[300px] lg:w-[900px] md:min-w-[700px] md:h-[340px] sm:min-w-[600px] lg:h-[340px] rounded-sm lg:mt-20 xl:h-[420px] group overflow-hidden">
            <div v-for="(item, index) in items" :key="index">
                <NuxtLink to="#">
                    <UnLazyImage
                    class="animatedSliderImage w-[580px] h-[300px] object-cover sm:min-w-[710px] sm:h-[320px] md:min-w-[950px] md:h-[340px] lg:w-[880px] lg:h-[340px] xl:h-[420px] group-hover:scale-[110%]
                    hover:transition-all hover:duration-500 hover:ease-in-out duration-500"
                        :src="item.src"
                        blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                        auto-sizes
                        v-if="index == selectedItem"
                    />
                </NuxtLink>
            </div>
        </div>
        <div class="mt-2 flex items-center gap-x-8 justify-center lg:flex-col lg:gap-y-4 lg:mt-20">
            <div @click="move(-1)" class="lg:rotate-90 cursor-pointer">
                <Icon size="32" name="uil:angle-left" />
            </div>
            <div :style="[locale != 'fa' ? 'font-family: sans-serif' : '']" class="font-bold ">{{ selectedItem + 1 }} / {{ items.length }}</div>
            <div @click="move(1)" class="lg:rotate-90 cursor-pointer">
                <Icon size="32" name="uil:angle-right" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const {locale} = useI18n()
const selectedItem = ref(0)
const items = reactive([
    {
        src: '/graffiti.jpg',
        persianTitle: 'لورم ایپسوم متن ساختگی',
        englishTitle: 'Lorem ipsum dolor sit amet item one',
        createdAt: ' July 21 2023'
    },
    {
        src: '/figma-pic.webp',
        persianTitle: 'لورم ایپسوم متن ساختگی',
        englishTitle: 'Lorem ipsum dolor sit amet item one',
        createdAt: 'August 6 2023'
    },
    {
        src: '/office.jpg',
        persianTitle: 'لورم ایپسوم متن ساختگی',
        englishTitle: 'Lorem ipsum dolor sit amet item one',
        createdAt: 'May 4 2023'
    }
])
function move(n: number) {
    if(selectedItem.value + n < 0 ) {
        selectedItem.value = items.length -1
    }else if(selectedItem.value + n >= items.length ) {
        selectedItem.value = 0
    }else {
        selectedItem.value += n
    }
}
</script>

<style>
.animatedSliderText {
    animation-name: sliderText;
    animation-timing-function: ease-in-out;
    animation-duration: 500ms;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
@keyframes sliderText {
    from{opacity: 0; transform: translateX(-200px);}
    to{opacity: 1; transform: translateX(0px);}
}
.animatedSliderImage {
    animation-name: sliderImage;
    animation-timing-function: ease-in-out;
    animation-duration: 700ms;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
@keyframes sliderImage {
    from{opacity: 0;}
    to{opacity: 1;}
}
</style>