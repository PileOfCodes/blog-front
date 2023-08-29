<template>
    <div class="flex flex-col items-center">
        <div class="dark:text-white my-12 font-bold text-[45px]">{{ locale == 'fa' ? 'فرم  ورود' : 'login form' }}</div>
        <div class="flex items-center justify-center ">
            <div class="w-[420px] p-4 bg-slate-800 dark:bg-white dark:text-slate-800 rounded-sm shadow-sm flex flex-col">
                <input id="email" ref="emailInput" type="text" v-model="email" class="border-2 font-bold text-lg my-2 px-2 outline-0 focus:ring-2 ring-green-400 rounded-sm py-3 dark:border-gray-400 " :placeholder="locale == 'fa' ? 'ایمیل/نام کاربری' : 'email | username'">
                <div class="relative">
                    <input id="password" :type="type" v-model="password" class="border-2 font-bold w-full text-lg my-2 px-2 outline-0 focus:ring-2 ring-green-400 rounded-sm py-3 dark:border-gray-400 " :placeholder="locale == 'fa' ? 'گذر واژه' : 'password'">
                    <Icon size="21" @click="changeType" class="absolute cursor-pointer top-[50%] translate-y-[-50%] transition-all right-2 duration-150" :name=" type == 'password' ? 'uil:eye' : 'uil:eye-slash'" />
                </div>
                <div class="flex items-center justify-center mt-4">
                    <span v-if="pending" class="loading loading-dots loading-lg text-white dark:text-slate-800 "></span>
                    <button v-else @click="sendForm" :disabled="disableBtn" class="py-4 px-12 bg-white text-slate-800 hover:border-white hover:text-white hover:bg-slate-800 dark:bg-slate-800 dark:text-white font-bold rounded-sm border-2 dark:border-white dark:hover:border-slate-800 dark:hover:text-slate-800 dark:hover:bg-white transition-all duration-150">{{ $t('send form') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useToast} from 'vue-toastification'
const localePath  = useLocalePath()
const {locale} = useI18n()
const toast = useToast()
const type = ref('password')
const disableBtn = ref(true)
const pending = ref(false)
const email = ref('')
const password = ref('')
const emailInput = ref<HTMLInputElement | null>(null)
const {authUser} = useAuth()
function changeType(){
    if(type.value == 'password') {
        type.value = 'text'
    }else {
        type.value = 'password'
    }
}
watch(email, (newVal) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const usernamePattern = /^[a-zA-Z0-9]+$/
    if(pattern.test(newVal) || usernamePattern.test(newVal)) {
            disableBtn.value = false
    }else {
            disableBtn.value = true
    }
})

async function sendForm() {
    pending.value = true
    if(password.value == '') {
        toast.warning(locale.value == 'fa' ? 'فیلد پسورد الزامی است' : 'password field is required')
        return
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    if(!passwordPattern.test(password.value)) {
        toast.warning(locale.value == 'fa' ? ' پسورد مناسب نمی باشد' : 'password format in not suitable')
        return
    }
    try {
        
        const data : any = await $fetch("/api/auth/login", {
            method: 'POST',
            body: {email: email.value, password: password.value}
        })
        
        authUser.value = data
        toast.success('user registered successfully')
        return navigateTo(localePath('/'))
    } catch (error) {

    }finally {
        pending.value = false
    }
}
onMounted(() => emailInput.value?.focus())
</script>