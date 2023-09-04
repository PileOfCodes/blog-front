<template>
    <div class="flex flex-col items-center">
        <div class="dark:text-white my-12 font-bold text-[45px]">{{ locale == 'fa' ? 'فرم ثبت نام' : 'Register form' }}</div>
        <div class="flex items-center justify-center ">
            <div class="w-[420px] p-4 bg-slate-800 dark:bg-white dark:text-slate-800 rounded-sm shadow-sm flex flex-col">
                <input id="name" ref="nameInput" type="text" v-model="name" class="border-2 font-bold text-lg my-2 px-2 outline-0 focus:ring-2 ring-green-400 rounded-sm py-3 dark:border-gray-400 " :placeholder="locale == 'fa' ? 'نام کاربری' : 'username'">
                <input id="email" type="text" v-model="email" class="border-2 font-bold text-lg my-2 px-2 outline-0 focus:ring-2 ring-green-400 rounded-sm py-3 dark:border-gray-400 " :placeholder="locale == 'fa' ? 'ایمیل' : 'email'">
                <div class="relative">
                    <input id="password" :type="type" v-model="password" class="border-2 font-bold w-full text-lg my-2 px-2 outline-0 focus:ring-2 ring-green-400 rounded-sm py-3 dark:border-gray-400 " :placeholder="locale == 'fa' ? 'گذر واژه' : 'password'">
                    <Icon size="21" @click="changeType" class="absolute cursor-pointer top-[50%] translate-y-[-50%] transition-all right-2 duration-150" :name=" type == 'password' ? 'uil:eye' : 'uil:eye-slash'" />
                </div>
                <div class="relative">
                    <input id="c_password" :type="ctype" v-model="c_password" class="border-2 font-bold w-full text-lg my-2 px-2 outline-0 focus:ring-2 ring-green-400 rounded-sm py-3 dark:border-gray-400 " :placeholder="locale == 'fa' ? ' تایید گذر واژه ' : 'confirm password'">
                    <Icon size="21" @click="changeCType" class="absolute cursor-pointer top-[50%] translate-y-[-50%] transition-all right-2 duration-150" :name=" ctype == 'password' ? 'uil:eye' : 'uil:eye-slash'" />
                </div>
                <div class="flex items-center justify-center mt-4">
                    <span v-if="pending" class="loading loading-dots loading-lg text-white dark:text-slate-800 "></span>
                    <button v-else @click="sendForm" class="py-4 px-12 bg-white text-slate-800 hover:border-white hover:text-white hover:bg-slate-800 dark:bg-slate-800 dark:text-white font-bold rounded-sm border-2 dark:border-white dark:hover:border-slate-800 dark:hover:text-slate-800 dark:hover:bg-white transition-all duration-150">{{ $t('send form') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useToast} from 'vue-toastification'
definePageMeta({
    middleware: ['guest']
})
const localePath = useLocalePath()
const {locale} = useI18n()
const toast = useToast()
const type = ref('password')
const ctype = ref('password')
const pending = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const c_password = ref('')
const nameInput = ref(null)
const {authUser} = useAuth()

function changeType(){
    if(type.value == 'password') {
        type.value = 'text'
    }else {
        type.value = 'password'
    }
}
function changeCType(){
    if(ctype.value == 'password') {
        ctype.value = 'text'
    }else {
        ctype.value = 'password'
    }
}

async function sendForm() {
    try {
        if(password.value == '' || name.value == '' || email.value == '' || c_password.value == '') {
            toast.warning(locale.value == 'fa' ? ' همه فیلدها الزامی هستند' : 'All the fields are required')
            return
        }
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!emailPattern.test(email.value)) {
            toast.warning(locale == 'fa' ? 'ایمیل معتبر نیست' : 'email is not valid')
            return
        }

        const namePattern = /^[a-zA-Z0-9]+$/
        if(!namePattern.test(name.value)) {
            toast.warning(locale == 'fa' ? 'نام کاربری معتبر نیست' : 'username is not valid')
            return
        }

        const passPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
        if(!passPattern.test(password.value)) {
            toast.warning(locale == 'fa' ? ' پسورد معتبر نیست' : 'password is not valid')
            return
        }

        if(password.value !== c_password.value) {
            toast.warning(locale == 'fa' ? ' تایید پسورد درست نمی باشد ' : 'confirm password is wrong')
            return
        }

        pending.value = true
        const data = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value, 
                password: password.value, 
                c_password: c_password.value
            }
        })
        authUser.value = data
        toast.success('user registered successfully')
        return navigateTo(localePath('/'))
    } catch (error) {

    }finally {
        pending.value = false
    }
}
onMounted(() => nameInput.value?.focus())
</script>