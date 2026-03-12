import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Content モジュールを有効化
  modules: ['@nuxt/content'],
  
  content: {
    experimental: {
      nativeSqlite: true
    },
    ignores: ['**/._*']
  },

  // Node.jsの警告を非表示に
  nitro: {
    experimental: {
      wasm: true
    }
  },

  // 既存の設定はそのままマージ
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  pages: true,
  css: [
    '~/assets/style/reset.css',
    '~/assets/style/animate.css',
    '~/assets/style/loaders.css',
    '~/assets/style/style.css'
  ],
  app: {
    head: {
      title: 'The GREEN MAM',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Babylonica&family=DotGothic16&family=Fredericka+the+Great&display=swap' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/lenis@1.3.8/dist/lenis.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r83/three.min.js' },
        { src: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' },
        { 
          innerHTML: `
            WebFont.load({
              google: {
                families: ['Babylonica', 'DotGothic16', 'Fredericka the Great']
              },
              loading: function() {
                document.documentElement.classList.add('wf-loading');
              },
              active: function() {
                document.documentElement.classList.remove('wf-loading');
                document.documentElement.classList.add('wf-active');
              },
              inactive: function() {
                document.documentElement.classList.remove('wf-loading');
                document.documentElement.classList.add('wf-inactive');
              }
            });
          `
        },
        { src: '/scripts/hover.js' },
        { src: '/scripts/tgm.js' }
      ]
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    server: {
      hmr: {
        clientPort: 3000
      }
    }
  },
  alias: { '@': '.', '@/*': './*' }
})
