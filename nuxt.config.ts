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
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'PWA Blog',
      short_name: 'PWA Blog',
      description: 'pwa blog for web developers',
      theme_color: '#00DC82',
      background_color: '#ffffff',
      icons: [
        {
          src: 'blog-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'blog-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'blog-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'blog-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    },
  },
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
