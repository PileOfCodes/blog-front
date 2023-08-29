// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css',
    '@/assets/css/tailwind.css'
  ],
  devtools: { enabled: false },
  modules: [
    '@unlazy/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxtjs/i18n',
    "nuxt-lodash",
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  build: {
    transpile: ['vue-toastification']
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'english',
        file: 'en-US.json'
      },
      {
        code: 'fa',
        name: 'فارسی',
        file: 'fa-FA.json'
      },
    ],
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    skipSettingLocaleOnNavigate: true
  },
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      apiBase : "http://127.0.0.1:8000/api"
    }
  }
})
