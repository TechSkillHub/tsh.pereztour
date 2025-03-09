<template>
  <div class="flex items-center py-24">
    <div class="container text-white grid md:grid-cols-2 md:h-[590px] justify-between items-center gap-14">
      <div class=" relative h-full">
        <img src="@/assets/images/quemSomos/img1.png" alt="Logo Perez Tour" class="absolute top-0 w-3/5">
        <img src="@/assets/images/quemSomos/img2.png" alt="Logo Perez Tour" class="absolute bottom-0 right-0 w-3/5">
      </div>
      <div class=" text-center md:text-left h-full flex flex-col justify-between">
        <div class="flex flex-col gap-6">
          <h1 class="title-sections" v-html="quemSomos.title"></h1>
          <h2 class="subtitle-sections" v-html="quemSomos.subtitle"></h2>
          <p class="text-sections" v-html="quemSomos.text"></p>
        </div>
        <FieldButton class="mx-auto md:mx-0">{{ quemSomos.cta}}</FieldButton>
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

</style>