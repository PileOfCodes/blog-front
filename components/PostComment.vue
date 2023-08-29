<template>
    <div class="flex flex-col mt-4 p-4 bg-slate-800 text-white  dark:text-slate-800 dark:bg-white rounded-sm">
        <div class="flex justify-between items-center ">
            <div class="flex items-center gap-x-2"> 
                <NuxtLink to="/profile/asdf" class="w-20 h-20 rounded-full overflow-hidden">
                    <UnLazyImage 
                        class="w-20 h-20 object-cover hover:scale-[115%] rounded-full duration-500 transition-all"
                        :src=" props.comment.user.image != null ? props.comment.user.image  : '/thumbs.png'" 
                        blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
                        auto-sizes 
                    />
                </NuxtLink>
                <div>
                    <div class="dark:text-slate-800 font-bold">{{ props.comment.user.name }}</div>
                    <div class="dark:text-gray-400 text-sm mt-2">{{ locale == 'fa' ? props.comment.persiandate : props.comment.englishdate }}</div>
                </div>
            </div>
            <div class="flex items-center gap-x-2">
                <div class="flex items-center gap-x-2" v-if="authUser && authUser.id == props.comment.user.id">
                    <div class="tooltip" :data-tip="locale == 'fa' ? ' حذف دیدگاه' : 'delete comment'">
                        <Icon class="cursor-pointer" size="27" name="mingcute:delete-2-line" />
                    </div>
                    <div class="tooltip" :data-tip="locale == 'fa' ? ' ویرایش دیدگاه' : 'edit comment'">
                        <Icon class="cursor-pointer" size="27" name="ci:edit" />
                    </div>
                </div>
                <div v-if="authUser" class="tooltip" :data-tip="locale == 'fa' ? ' پاسخ به دیدگاه' : 'reply'">
                    <Icon @click="showCommentSection = ! showCommentSection" class="cursor-pointer" size="27" name="ic:round-reply" />
                </div>
            </div>
        </div>
        <div class="mt-4 pr-2">{{ props.comment.body }}</div>
        <div class="flex justify-end items-center gap-x-4">
            <div v-if="props.comment.replies.length" class="tooltip flex items-center gap-x-1" :data-tip="locale == 'fa' ? ' واکنش ها به این دیدگاه' : 'replied comments'">
                <Icon @click="showReplies = ! showReplies" class="cursor-pointer" size="27" name="uil:comment" />
                <span :style="[locale == 'fa' ? 'font-family: IrsMedium' : 'font-family: sans-serif']">{{ props.comment.replies.length }} {{ $t('answer') }}</span>
            </div>
            <div class="tooltip flex items-center gap-x-1" :data-tip="locale == 'fa' ? 'مورد پسند' : 'Favorite'">
                <Icon class="cursor-pointer" @click="likeComment" size="28" name="solar:heart-bold" />
                <span :style="[locale == 'fa' ? 'font-family: IrsMedium' : 'font-family: sans-serif']">24</span>
            </div>
        </div>
        <div v-if="showReplies" class="animateReplySection" :class="showReplies ? 'my-4 mr-2 shadow-sm shadow-slate-600' : ''">
            <PostComment v-for="reply in props.comment.replies" :key="reply.id" :comment="reply" />
        </div>
    </div>
    <div v-if="showCommentSection">
        <div class="my-8 dark:text-slate-800 dark:bg-white border-0 rounded-sm animateCommentSectionOpen">
            <div class="py-2 px-4 border-b-2 font-bold transition-all duration-150">{{ locale == 'fa' ? 'دیدگاه خود را بنویسید' : 'write your comment' }}</div>
            <textarea id="replyommentTextarea" ref="replyommentTextarea" v-model.trim="userReplyComment" :placeholder="locale == 'fa' ? 'دیدگاه...' : 'comment...'" class="resize-none outline-none w-full border-none text-lg px-4 h-32 py-2 font-bold transition-all duration-150"></textarea>
            <div class="flex justify-end">
                <span v-if="pending" class="loading loading-dots loading-lg text-white dark:text-slate-800 "></span>
                <button v-else @click="sendReplyComment" :disabled="disBtn"  class="px-4 py-3 border-2 border-white font-bold dark:bg-slate-800 dark:text-white dark:hover:border-slate-800 dark:hover:text-slate-800 dark:hover:bg-transparent rounded-sm my-2 mx-2 transition-all duration-150 ">{{ $t('send') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useToast} from 'vue-toastification'
const toast = useToast()
const {locale} : any = useI18n()
const localePath = useLocalePath()
const {authUser} : any = useAuth()
const props = defineProps(['comment'])
const pending = ref(false)
const {public : {apiBase}} = useRuntimeConfig()
const showCommentSection = ref(false)
const userReplyComment = ref<string>('')
const disBtn = ref(true)
const showReplies = ref(false)
const route = useRoute()

const {data: post} : any = await useFetch(`${apiBase}/posts/getPost`, {
    params: {slug: route.params.slug}
})

watch(userReplyComment, (newVal) => {
    if(newVal == '') {
        disBtn.value = true
    }else {
        disBtn.value = false
    }
})

function likeComment() {
    if(authUser.value) {
        console.log('liked');
    }else {
        locale.value == 'fa' ? toast.info('برای پسند کردن ابتدا باید وارد وبلاگ شوید') : toast.info('you need to first login into weblog')
        setTimeout(() => {
            return navigateTo(localePath('/auth/login'))
        }, 3000);
    }
}

async function sendReplyComment() {
    
    pending.value = true
    try {
        await $fetch('/api/comment/create', {
            method: 'POST',
            body: {
                body: userReplyComment.value,
                comment_id: props.comment.id,
                post_id: post.value.data.id
            },
        })
        toast.success(locale.value == 'fa' ? ' دیدگاه شما با موفقیت ثبت شد ' : 'your comment added successfully')
    } catch (error) {

    }finally {
        pending.value = false
        userReplyComment.value = ''
    }
}
</script>

<style setup>
.animateReplySection {
    animation-name: replySection;
    animation-duration: 500ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: 1; 
}
@keyframes replySection {
    from{display: none;opacity: 0;}
    to{display: block; opacity: 1;}
}
.animateCommentSectionOpen {
    animation-name: commentSection;
    animation-duration: 500ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
}
@keyframes commentSection {
    from{display: none;opacity: 0; height: 0;}
    to{display: block; opacity: 1; height: 250px;}
}
</style>