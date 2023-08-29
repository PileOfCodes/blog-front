<template>
    <div :class="[locale == 'fa' ? 'md:items-end' : 'md:items-start']" class="mt-4 flex flex-wrap items-center justify-center gap-y-8 sm:gap-2 md:my-2 md:flex md:flex-col articleSection3">
        <div v-for="(article, index) in articles" :key="article.id" :class="['group',{'animateArticleBox3':showCategoryItems}]">
            <NuxtLink to="#" class="relative" :style="[locale == 'fa' ? 'font-family: irsMedium' : 'font-family: sans-serif']">
                <div :style="[locale == 'fa' ? 'direction:rtl' : 'direction:ltr']" class="text-slate-800 dark:text-white  font-bold transition-all duration-300">
                    <div :class="[locale == 'fa' ? 'absolute bottom-[10%] sm:bottom-[5%] right-2 ' : 'absolute bottom-[10%] sm:bottom-[5%] left-2 ']" class="opacity-0 text-sm lg:text-xs md:text-xs lg:text-sm lg:w-[240px] md:w-[100px] w-[240px] truncate group-hover:opacity-100 font-bold group-hover:duration-500 transition-all sm:truncate">{{ locale == 'fa' ? article.persianTitle : article.englishTitle}}</div>
                    <div :class="[locale == 'fa' ? 'absolute bottom-[10%] left-2 sm:bottom-[5%] sm:left-2' : 'absolute bottom-[10%] sm:bottom-[5%] right-2']" class="opacity-0 text-sm sm:text-xs group-hover:opacity-100 font-bold group-hover:duration-500 transition-all dark:text-slate-400 text-slate-600">{{ article.createdAt }}</div>
                </div>
                <div style="direction: ltr;"
                class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 transition-all absolute top-[50%] left-[38%] translate-x-[-38%] translate-y-[-50%] dark:text-white">
                    <Icon size="28" name="solar:heart-bold" />
                    <span>17</span>
                </div>
                <div style="direction: ltr;"
                class="opacity-0 group-hover:opacity-100 font-bold group-hover:duration-500 group-hover:transition-all duration-500 absolute top-[50%] left-[62%] translate-x-[-62%] translate-y-[-50%] dark:text-white">
                    <Icon size="28" name="uil:comment" />
                    <span>24</span>
                </div>
                <div class="rounded-sm hover:opacity-10 group-hover:opacity-100 group-hover:border-2 group-hover:border-slate-800 group-hover:dark:border-white  group-hover:duration-500 group-hover:transition-all overflow-hidden w-[460px] max-h-[200px] sm:max-w-[300px] sm:h-[240px] md:w-[220px] lg:w-[280px] md:h-[100px] md:rounded-lg">
                    <UnLazyImage 
                    :class="newestPostImageStyle"
                    :src="article.image" 
                    blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
                    auto-sizes 
                    />
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const {locale} = useI18n()
const newestPostImageStyle = ref('w-full h-full hover:opacity-10 md:object-cover md:shadow-md group-hover:scale-[105%] md:shadow-slate-600 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out transition-all duration-500')
const articles = reactive([
    {
        id: 1,
        image: '/eye.jpg',
        persianTitle: 'لورم ایپسوم متن ساختگی',
        englishTitle: 'Lorem ipsum dolor sit amet',
        persianDescription: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        englishDescription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus iste doloribus hic molestiae delectus, dolore facilis, non suscipit illo alias amet repellat, exercitationem quas quis sapiente totam minima mollitia esse error adipisci doloremque temporibus aliquid quisquam! Sed delectus adipisci praesentium eligendi fugiat provident tempore, architecto aperiam ex cupiditate quae rerum!',
        createdAt: 'June 26 2023'
    },
    {
        id: 2,
        image: '/tag.jpg',
        persianTitle: 'لورم ایپسوم متن ساختگی',
        englishTitle: 'Lorem ipsum dolor sit amet',
        persianDescription: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        englishDescription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus iste doloribus hic molestiae delectus, dolore facilis, non suscipit illo alias amet repellat, exercitationem quas quis sapiente totam minima mollitia esse error adipisci doloremque temporibus aliquid quisquam! Sed delectus adipisci praesentium eligendi fugiat provident tempore, architecto aperiam ex cupiditate quae rerum!',
        createdAt: 'June 26 2023'
    },
    {
        id: 3,
        image: '/cafe.jpg',
        persianTitle: 'لورم ایپسوم متن ساختگی',
        englishTitle: 'Lorem ipsum dolor sit amet',
        persianDescription: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        englishDescription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus iste doloribus hic molestiae delectus, dolore facilis, non suscipit illo alias amet repellat, exercitationem quas quis sapiente totam minima mollitia esse error adipisci doloremque temporibus aliquid quisquam! Sed delectus adipisci praesentium eligendi fugiat provident tempore, architecto aperiam ex cupiditate quae rerum!',
        createdAt: 'June 26 2023'
    },
    {
        id: 4,
        image: '/comic.webp',
        persianTitle: 'لورم ایپسوم متن ساختگی',
        englishTitle: 'Lorem ipsum dolor sit amet',
        persianDescription: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        englishDescription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus iste doloribus hic molestiae delectus, dolore facilis, non suscipit illo alias amet repellat, exercitationem quas quis sapiente totam minima mollitia esse error adipisci doloremque temporibus aliquid quisquam! Sed delectus adipisci praesentium eligendi fugiat provident tempore, architecto aperiam ex cupiditate quae rerum!',
        createdAt: 'June 26 2023'
    }
])
const showCategoryItems = ref(false);
const observer = ref<IntersectionObserver | null>(null)
const setupObserver = () => {
    observer.value = new IntersectionObserver((entries) => {
        let entry = entries[0]
        if(entry.isIntersecting) {
            showCategoryItems.value = true
        }
    })
    const category = document.querySelector('.articleSection3') as HTMLDivElement | null
    if(category) {
        observer.value.observe(category)
    }
}
onMounted(() => {
    setupObserver()
})
onBeforeUpdate(() => {
    setupObserver()
})
onUnmounted(() => {
    if(observer.value) {
        observer.value.disconnect()
    }
})
</script>

<style>
.animateArticleBox3 {
    animation-name: articleBox3;
    animation-timing-function: ease-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    opacity: 0;
}
.animateArticleBox3:nth-of-type(1) {
    animation-name: articleBox3;
    opacity: 0;
}
.animateArticleBox3:nth-of-type(2) {
    animation-name: articleBox3;
    animation-delay: 300ms;
    opacity: 0;
}
.animateArticleBox3:nth-of-type(3) {
    animation-name: articleBox3;
    animation-delay: 500ms;
    opacity: 0;
}
.animateArticleBox3:nth-of-type(4) {
    animation-name: articleBox3;
    animation-delay: 700ms;
    opacity: 0;
}
@keyframes articleBox3 {
    from{opacity: 0; transform: translateX(-600px);}
    to{opacity: 1; transform: translateX(0px);}
}
</style>