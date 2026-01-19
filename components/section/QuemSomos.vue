<template>
  <div class="flex items-center flex-col py-24 text-offWhite">
    <div class="container text-center">
      <h1 class="title-sections mb-8" v-html="quemSomos.title"></h1>
      <!-- <h2 class="subtitle-sections" v-html="quemSomos.subtitle"></h2> -->
      <p class="text-sections" v-html="quemSomos.text"></p>
    </div>

    <div class="container grid md:grid-cols-3 justify-between items-center gap-8 mt-14">
      <div class="relative h-full hidden md:block">
        <img src="@/assets/images/quemSomos/img1.png" alt="Logo Perez Tour" class="absolute top-0 w-full">
        <!-- <img src="@/assets/images/quemSomos/img2.png" alt="Logo Perez Tour" class="absolute bottom-0 right-0 w-3/5"> -->
      </div>
      <div class=" text-center md:text-left h-full flex flex-col justify-between col-span-2">
        <div class="flex flex-col gap-4">
          <h3 class="!mt-0">Missão</h3>
          <p class="text-sections" v-html="quemSomos.missao"></p>
          <h3>Visão</h3>
          <p class="text-sections" v-html="quemSomos.visao"></p>
          <h3>Valores</h3>
          <p class="text-sections" v-html="quemSomos.valores"></p>
        </div>
        <div class="relative md:hidden block my-8">
          <img src="@/assets/images/quemSomos/img1.png" alt="Logo Perez Tour" class="w-full">
          <!-- <img src="@/assets/images/quemSomos/img2.png" alt="Logo Perez Tour" class="absolute bottom-0 right-0 w-3/5"> -->
        </div>
        <FieldButton class="mx-auto md:mx-0 mt-8">{{ quemSomos.cta}}</FieldButton>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'

const content = await useContentCustom()
const quemSomos = content.quemSomos

</script>

<style scoped>
#quem-somos {
  @apply bg-rightVector bg-right-bottom bg-no-repeat bg-contain lg:bg-auto;
}
h3 {
  @apply text-xl font-semibold mb-0 mt-4 uppercase underline;
}
</style>