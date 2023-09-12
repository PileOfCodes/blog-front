<template>
    <div class="my-20 flex flex-col items-center justify-center">
        <div class="w-52 h-52 rounded-full shadow-sm ">
            <img :src="authUser.image || '/thumbs.png'" @click="selectImage" class="w-52 h-52 rounded-full cursor-pointer object-cover" alt="profileImg">
        </div>
        <input type="file" @change="uploadImage" hidden ref="profileImage" id="profileImage">
        <div :style="locale == 'fa' ? 'direction: rtl' : 'direction: ltr'">
            <div class="mt-12">
                <label for="username" class="block text-[21px] text-slate-800 dark:text-white">{{ $t('name') }} :</label>
                <input type="text" id="username" class="w-[400px] p-2 rounded-sm focus:ring-4 focus:ring-green-400 outline-none font-bold" v-model.trim="username" :placeholder="authUser.name">
            </div>
            <div class="mt-4">
                <label for="email" class="block text-[21px] text-slate-800 dark:text-white">{{ $t('email') }}:</label>
                <input type="email" id="email" class="w-[400px] p-2 rounded-sm focus:ring-4 focus:ring-green-400 outline-none font-bold" v-model.trim="email" :placeholder="authUser.email">
            </div>
            <div class="mt-4">
                <label for="password" class="block text-[21px] text-slate-800 dark:text-white">{{ $t('password') }}:</label>
                <input type="password" id="password" class="w-[400px] p-2 rounded-sm outline-none focus:ring-4 focus:ring-green-400 font-bold" v-model.trim="password" placeholder="chnage your password password">
            </div>
        </div>
        <div class="mt-8 flex items-center justify-center">
            <span v-if="pending" class="loading loading-dots loading-lg dark:text-white"></span>
        <button v-else @click="sendFile" class="dark:text-white dark:border-white font-bold border-2 border-slate-800 hover:bg-slate-800 hover:text-white rounded-sm px-4 py-2 dark:hover:bg-white dark:hover:text-slate-800 transition-all duration-300 " >{{ $t('save') }}</button>
        </div>
    </div>
</template>

<script setup>
import {useToast} from 'vue-toastification'
definePageMeta({
    middleware: ['auth']
})
const toast = useToast()
const {authUser} = useAuth()
const profileImage = ref(null)
const primaryImage = ref(null)
const username = ref('')
const email = ref('')
const password = ref('')
const pending = ref(false)
const {locale} = useI18n()
const route = useRoute()
const localePath = useLocalePath()

function selectImage() {
    profileImage.value.click()
}

function uploadImage(el) {
    primaryImage.value = el.target.files[0]
}

async function sendFile() {
    if(primaryImage.value == null) {
        toast.error(locale.value == 'fa' ? 'تصویر خود را انتخاب کنید' : 'select an image first')
        return
    }

    try {
        pending.value = true
        const formData = new FormData()
        formData.append('image', primaryImage.value)
        formData.append('name', username.value)
        formData.append('email', email.value)
        formData.append('password', password.value)
        await $fetch('/api/auth/profile', {
            method: "POST",
            body: formData
        })
        toast.success(locale.value == 'fa' ? ' پروفایل کاربری بروز شد ' : 'user profile updated successfully')
    } catch (error) {

    }finally {
        pending.value = false
        return navigateTo(localePath('/'))
    }
}
</script>