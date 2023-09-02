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
                        <Icon @click="showDeleteCard = true" class="cursor-pointer" size="27" name="mingcute:delete-2-line" />
                    </div>
                    <div class="tooltip" :data-tip="locale == 'fa' ? ' ویرایش دیدگاه' : 'edit comment'">
                        <Icon @click="showEditSection = ! showEditSection" class="cursor-pointer" size="27" name="ci:edit" />
                    </div>
                </div>
                <div v-if="authUser" class="tooltip" :data-tip="locale == 'fa' ? ' پاسخ به دیدگاه' : 'reply'">
                    <Icon @click="showCommentSection = ! showCommentSection" class="cursor-pointer" size="27" name="ic:round-reply" />
                </div>
            </div>
        </div>
        <div class="mt-4 pr-2">{{ props.comment.body }}</div>
        <div class="flex justify-end items-center gap-x-4">
            <div v-if="props.comment.replies.length" @click="showReplies = ! showReplies" class="tooltip flex items-center gap-x-1 cursor-pointer" :data-tip="locale == 'fa' ? ' واکنش ها به این دیدگاه' : 'replied comments'">
                <Icon size="27" name="uil:comment" />
                <span :style="[locale == 'fa' ? 'font-family: IrsMedium' : 'font-family: sans-serif']">{{ props.comment.replies.length }} {{ $t('answer') }}</span>
            </div>
            <ClientOnly>
                <div @click="likeComment(props.comment.id)" class="tooltip flex items-center gap-x-1 cursor-pointer" :data-tip="locale == 'fa' ? 'مورد پسند' : 'Favorite'">
                    <Icon :class="{'text-red-600' : isCommentLiked}" size="28" name="solar:heart-bold" />
                    <span :style="[locale == 'fa' ? 'font-family: IrsMedium' : 'font-family: sans-serif']">{{ commentLikes }}</span>
                </div>
            </ClientOnly>
        </div>
        <div v-if="showReplies" :class="showReplies ? 'animateReplySection my-4 mr-2 shadow-sm shadow-slate-600' : ''">
            <PostComment v-for="reply in props.comment.replies" :key="reply.id" :comment="reply" />
        </div>
    </div>
    <div v-if="showCommentSection">
        <div class="my-8 dark:text-slate-800 dark:bg-white border-0 rounded-sm animateCommentSectionOpen">
            <div class="py-2 px-4 border-b-2 font-bold transition-all duration-150">{{ locale == 'fa' ? 'دیدگاه خود را بنویسید' : 'write your comment' }}</div>
            <textarea id="replyCommentTextarea" ref="replyommentTextarea" v-model.trim="userReplyComment" :placeholder="locale == 'fa' ? 'دیدگاه...' : 'comment...'" class="resize-none outline-none w-full border-none text-lg px-4 h-32 py-2 font-bold transition-all duration-150"></textarea>
            <div class="flex justify-end">
                <span v-if="pending" class="loading loading-dots loading-lg text-white dark:text-slate-800 "></span>
                <button v-else @click="sendReplyComment" :disabled="disBtn"  class="px-4 py-3 border-2 border-white font-bold dark:bg-slate-800 dark:text-white dark:hover:border-slate-800 dark:hover:text-slate-800 dark:hover:bg-transparent rounded-sm my-2 mx-2 transition-all duration-150 ">{{ $t('send') }}</button>
            </div>
        </div>
    </div>
    <div v-if="showEditSection">
        <div class="my-8 dark:text-slate-800 dark:bg-white border-0 rounded-sm animateCommentSectionOpen">
            <div class="py-2 px-4 border-b-2 font-bold transition-all duration-150">{{ locale == 'fa' ? 'دیدگاه خود را تغییر دهید' : 'Edit your comment' }}</div>
            <textarea id="editCommentTextarea" ref="replyommentTextarea" v-model.trim="userUpdateComment" :placeholder="locale == 'fa' ? 'دیدگاه...' : 'comment...'" class="resize-none outline-none w-full border-none text-lg px-4 h-32 py-2 font-bold transition-all duration-150"></textarea>
            <div class="flex justify-end">
                <span v-if="pending" class="loading loading-dots loading-lg text-white dark:text-slate-800 "></span>
                <button v-else @click="sendupdatedComment" :disabled="editDisBtn"  class="px-4 py-3 border-2 border-white font-bold dark:bg-slate-800 dark:text-white dark:hover:border-slate-800 dark:hover:text-slate-800 dark:hover:bg-transparent rounded-sm my-2 mx-2 transition-all duration-150 ">{{ $t('update') }}</button>
            </div>
        </div>
    </div>
    <div v-if="commentLikePending">
        <div class="fixed z-[1000] top-0 left-0 bottom-0 w-full h-full bg-black flex items-center justify-center ">
            <span class="loading loading-infinity loading-big-spinner text-success"></span>
        </div>
    </div>
    <div v-if="showDeleteCard" class="animateModalCard">
        <div class="fixed z-[1000] top-0 left-0 bottom-0 w-full h-full bg-black opacity-75 flex items-center justify-center "></div>
        <div class="fixed z-[2000] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white w-[500px] h-[200px] rounded-md flex flex-col items-center justify-between "> 
            <span class="text-lg font-bold text-slate-800 mt-8">{{ locale == 'fa' ? ' آیا می خواهید این دیدگاه پاک شود؟ ' : 'Do you want to delete this comment?' }}</span>
            <div class="flex gap-x-10 justify-center">
                <div>
                    <span v-if="pending" class="loading loading-dots loading-lg text-white dark:text-slate-800 mb-6 "></span>
                    <button @click="deleteComment" class="border-slate-800 rounded-sm mb-6 py-2 px-8 border-2 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out">{{ $t('yes') }}</button>
                </div>
                <button @click="showDeleteCard = false" class="border-slate-800 rounded-sm mb-6 py-2 px-8 border-2 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out">{{ $t('no') }}</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import {useToast} from 'vue-toastification'
import {useLikeStore} from '~/store/like'
import {reloadNuxtApp} from 'nuxt/app'
const likeUserComment = useLikeStore()
const toast = useToast()
const {locale} = useI18n()
const localePath = useLocalePath()
const {authUser} = useAuth()
const props = defineProps(['comment'])
const pending = ref(false)
const {public : {apiBase}} = useRuntimeConfig()
const showCommentSection = ref(false)
const showEditSection = ref(false)
const userReplyComment = ref('')
const userUpdateComment = ref('')
const disBtn = ref(true)
const editDisBtn = ref(true)
const showReplies = ref(false)
const route = useRoute()
const commentLikePending = ref(false)
const showDeleteCard = ref(false)


const isCommentLiked = computed(() => likeUserComment.isCommentLiked(authUser.value.id, props.comment.id))
const commentLikes = computed(() => likeUserComment.commentLikes(props.comment.id))

const {data: post} = await useFetch(`${apiBase}/posts/getPost`, {
    params: {slug: route.params.slug}
})

watch(userUpdateComment, (newVal) => {
    if(newVal == '' || newVal == null) {
        editDisBtn.value = true
    }else {
        editDisBtn.value = false
    }
})

watch(userReplyComment, (newVal) => {
    if(newVal == '' || newVal == null) {
        disBtn.value = true
    }else {
        disBtn.value = false
    }
})

async function likeComment(commentId) {
    if(authUser.value) {
        try {
            commentLikePending.value = true
            const data = await $fetch('/api/comment/like/update', {
                method: 'POST',
                body: {comment_id: commentId}
            })
            likeUserComment.getCommentLike(data)
        } catch (error) {
            
        }finally {
            commentLikePending.value = false
        }
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

async function deleteComment() {
    try {
        await $fetch('/api/global', {
            method: "DELETE",
            Headers: useRequestHeaders(['cookie']),
            query: {url: `/admin/comments/${props.comment.id}`}
        })
        toast.success(locale.value == 'fa' ? ' دیدگاه شما با موفقیت حذف شد ' : 'your comment deleted successfully')
    } catch (error) {
    }finally {
        showDeleteCard.value = false
        reloadNuxtApp({
            path: route.fullPath,
            ttl: 500
        })
    }
}

async function sendupdatedComment() {
    pending.value = true
    try {
        await $fetch('/api/global', {
            method: "PUT",
            body: {
                body: userUpdateComment.value
            },
            query: {url: `/admin/comments/${props.comment.id}`}
        })
        toast.success(locale.value == 'fa' ? '  دیدگاه شما با موفقیت تغییر یافت ' : 'your comment updated successfully')
    } catch (error) {
    }finally {
        pending.value = false
        userUpdateComment.value = ''
        showEditSection.value = false
        reloadNuxtApp({
            path: route.fullPath,
            ttl: 500
        })
    }
}

</script>

<style setup>
.animateModalCard {
    animation-name: modalCard;
    animation-duration: 300ms;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    z-index: 10000; 
    position: relative;
}
@keyframes modalCard {
    from{opacity:0;}
    to{opacity: 1;}
}
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