<template>
    <div class="sticky top-0 z-[100]">
        <div class="bg-white flex flex-col gap-y-8 border-b-[1px] dark:text-white dark:bg-slate-800 px-4 py-8 transition-all duration-300
        sm:h-20 sm:px-8 sm:flex-row sm:justify-between sm:py-0 sm:items-center lg:h-20" :class="[closeMenu ? 'h-[330px] transition-all duration-500' : 'h-[99px] transition-all duration-500']">
            <div class="flex items-center justify-between sm:flex">
                <div class="flex lg:items-center gap-x-4 sm:gap-y-6 lg:flex-row lg:gap-x-4">
                    <DarkModeSwitch v-model="modelValue" />
                    <LanguageSwitch />
                </div>
                <HamburgerMenu class="sm:hidden" :closeMenu="closeMenu" @toggle-menu="(value) => closeMenu = value" />
            </div>
            <div style="direction: rtl;" :class="[closeMenu ? 'flex flex-col visible' : 'hidden']" class="text-slate-800 dark:text-white sm:flex items-center gap-y-4 font-bold sm:flex-row sm:items-center sm:gap-x-4 md:gap-x-4">
                <div v-if="authUser" class="flex items-center">
                    <div class="dropdown dropdown-hover">
                    <img :src="authUser.image || '/thumbs.png'" tabindex="0" class="w-12 h-12 rounded-full">
                        <ul tabindex="0" class="dropdown-content dark:text-slate-800 z-[1] menu p-2 shadow bg-base-100 rounded-sm w-52">
                            <li><NuxtLink :to="localePath(`/profile/@${authUser.name}`)">{{ $t('profile') }}</NuxtLink></li>
                            <li><span @click="logout">{{ $t('logout') }}</span></li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <NuxtLink class="hover:dark:bg-slate-700 hover:bg-gray-200 rounded-sm transition-all duration-75 px-4 py-2" active-class="tw-active" :to="localePath('/auth/login')">{{ $t('login') }}</NuxtLink>
                    <NuxtLink class="hover:dark:bg-slate-700 hover:bg-gray-200 rounded-sm transition-all duration-75 px-4 py-2" active-class="tw-active" :to="localePath('/auth/register')">{{ $t('register') }}</NuxtLink>
                </div>
                <span class="hidden sm:block text-gray-200 border-r-[3px] opacity-[.7] h-10  "></span>
                <NuxtLink class="hover:dark:bg-slate-700 hover:bg-gray-200 rounded-sm transition-all duration-75 px-4 py-2" active-class="tw-active" :to="localePath('/')">{{ $t('blog') }}</NuxtLink>
                <NuxtLink class="hover:dark:bg-slate-700 hover:bg-gray-200 rounded-sm transition-all duration-75 px-4 py-2" active-class="tw-active" :to="localePath('/posts')">{{ $t('articles') }}</NuxtLink>
                <NuxtLink class="hover:dark:bg-slate-700 hover:bg-gray-200 rounded-sm transition-all duration-75 px-4 py-2" active-class="tw-active" :to="localePath('/categories')">{{ $t('categories') }}</NuxtLink>
            </div>
        </div>
        <HeaderSecondList />
    </div>
</template>

<script setup>
import {useToast} from 'vue-toastification'
const colorMode = useColorMode()
const localePath = useLocalePath()
const closeMenu = ref(false)
const modelValue = ref(true)
const {authUser}  = useAuth();
const toast = useToast()


async function logout() {
    await $fetch('/api/auth/logout', {
        method: "POST",
    })
    authUser.value = null
    toast.warning("از سیستم خارج شدید")
    return navigateTo('/')
}

onMounted(() => {
    modelValue.value = colorMode.preference === 'dark'
})
</script>
