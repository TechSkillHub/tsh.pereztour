<template>
  <div class="flex items-center min-h-screen py-8 hero pt-32">
    <div class="container flex justify-between items-center md:h-[480px] flex-col md:flex-row gap-8">
      <div class="text-white w-full md:w-1/2 text-center md:text-left">
        <h1 class="font-bold md:text-8xl text-6xl font-brand" v-html="hero.title"></h1>
        <p class="my-8">{{ hero.text }}</p>
        <FieldButton class="mx-auto md:mx-0">QUERO ECONOMIZAR!</FieldButton>
      </div>
      <div class="text-white w-full md:w-1/2 relative">
        <img src="@/assets/images/logo-image.webp" alt="Logo Perez Tour" class="max-w-[80%] m-auto">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'

const content = await useContentCustom()
const hero = content.hero

</script>

<style scoped>
.hero {
  @apply bg-vector1 bg-no-repeat bg-contain lg:bg-auto;
}
</style>