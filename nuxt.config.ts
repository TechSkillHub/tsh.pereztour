// https://nuxt.com/docs/api/configuration/nuxt-config
import { title, url, gtm } from "./utils/constants/seo.constant";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  plugins: ["~/plugins/vee-validate.client.ts"],
  css: [
    '~/assets/css/global.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  typescript: {
    strict: true,
  },
  // site: {
  //   url: url,
  //   name: title,
  // },
  // gtm: {
  //   id: gtm,
  // },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "pt-br",
      },
      meta: [
        { name: "author", content: "Tech Skill Hub" },
        {
          name: "developer",
          content: "Felipe Carvalho | felipe.carvalho@techskillhub.com",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
      ],
    },
  },
})