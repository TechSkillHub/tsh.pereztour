// https://nuxt.com/docs/api/configuration/nuxt-config
import { title, description, siteName, url } from "./utils/constants/seo.constant";

// Dados estruturados: e assim que buscadores E motores generativos (GEO/AEO/LLMs)
// entendem o que a agencia faz. Somente fatos que existem no proprio site.
// O campo sameAs foi omitido de proposito: os links sociais do projeto ainda apontam para
// as home das redes, nao para os perfis da agencia.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": url + "/#organizacao",
      name: siteName,
      alternateName: "Perez Tour",
      url: url + "/",
      description,
      telephone: "+5511966192321",
      areaServed: { "@type": "Country", name: "Brasil" },
      availableLanguage: ["pt-BR"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Passagens aéreas", description: "Emissão de passagens aéreas nacionais e internacionais." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pacotes de viagem", description: "Pacote completo e personalizado para o perfil do viajante." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Assessoria para visto americano", description: "Preparação para a entrevista no consulado, preenchimento e envio de documentação." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestão High-Ticket de pontos e milhas", description: "Serviço premium com contrato de 12 meses para gestão dos pontos e milhas acumulados em cartões de crédito." } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": url + "/#site",
      url: url + "/",
      name: siteName,
      inLanguage: "pt-BR",
      publisher: { "@id": url + "/#organizacao" }
    }
  ]
};

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: [
    '~/assets/css/global.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon'
    // @nuxt/content removido: era usado só para ler content/main.yml e trazia
    // ~59KB de JS para a página. O conteúdo virou utils/datas/content.ts.
  ],
  typescript: {
    strict: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title,
      htmlAttrs: {
        lang: "pt-BR",
      },
      meta: [
        { name: "author", content: "Tech Skill Hub" },
        {
          name: "developer",
          content: "Felipe Carvalho | felipe.carvalho@techskillhub.com",
        },

        // Open Graph, Twitter e description sao injetados pelo app.vue
        // via generateMeta(), que le do seo.constant.ts. Nao duplicar aqui.
      ],
      link: [
        { rel: "canonical", href: url + "/" },

        // Montserrat e servida do proprio dominio (public/fonts). O <link> para o
        // Google Fonts bloqueava a renderizacao por ~550ms (DNS + TLS + CSS externo).
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/montserrat-latin.woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon.ico",
        },
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
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(jsonLd),
        },
      ],
    },
  },
  nitro: {
    devServer: {
      host: '0.0.0.0', // Permite acesso externo
      allowedHosts: ['hml.pereztour.com.br'], // Adiciona o domínio à lista de permitidos
    }
  }
})
