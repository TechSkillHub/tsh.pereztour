<template>
  <div class="flex items-center py-24">
    <div class="container text-white grid md:grid-cols-2 grid-cols-1 gap-14">
      <div>
        <img src="@/assets/images/servicos/img1.jpg" alt="Logo Perez Tour" class="rounded-2xl">
      </div>
      <div class=" text-center md:text-left h-full flex flex-col justify-between">
        <div class="flex flex-col gap-6">
          <h1 class="title-sections" v-html="consultoria.title"></h1>
          <h2 class="subtitle-sections" v-html="consultoria.subtitle"></h2>
          <p class="text-sections" v-html="consultoria.text"></p>
        </div>
        <div class="grid md:grid-cols-2 justify-between gap-8">
          <div v-for="(item, index) in consultoria.items" :key="index" class="card p-8 text-left">
            <div class="w-fit h-fit">
              <Icon :name="item.icon" size="48" class="block" />
            </div>
            <h3 class="mb-4 mt-6">{{ item.title }}</h3>
            <h4>{{ item.text }}</h4>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'

const content = await useContentCustom()
const consultoria = content.consultoria

</script>

<style scoped>
#consultoria {
  @apply bg-rightVector bg-right bg-no-repeat bg-contain lg:bg-auto;
}
</style>