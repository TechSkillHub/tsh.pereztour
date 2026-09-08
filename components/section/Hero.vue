<template>
  <div class="flex items-center min-h-screen py-8 hero pt-32">
    <div class="container flex justify-between items-center flex-col md:flex-row gap-8">
      <div class="text-offWhite w-full md:w-1/2 text-center md:text-left">
        <h1 class="font-bold md:text-8xl text-5xl" v-html="hero.title"></h1>
        <p class="my-8">{{ hero.text }}</p>
        <NuxtLink
          :href="buildCtaWhatsAppLink('hero')"
          target="_blank"
          rel="noopener"
          class="inline-block mx-auto md:mx-0"
        >
          <FieldButton type="button">QUERO ECONOMIZAR!</FieldButton>
        </NuxtLink>
      </div>
      <div class="text-offWhite w-full md:w-1/2 relative">
        <img
          src="@/assets/images/banner.webp"
          alt="Mala, chapéu e câmera fotográfica prontos para viagem"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          width="560"
          height="564"
          class="max-w-[90%] m-auto"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'
import { buildCtaWhatsAppLink } from '~/utils/datas/whatsapp.data'

const content = await useContentCustom()
const hero = content.hero

</script>

<style scoped>
.hero {
  @apply bg-vector1 bg-no-repeat bg-contain lg:bg-auto;
}
</style>