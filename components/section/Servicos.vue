<template>
  <div class="flex items-center py-24">
    <div class="container text-offWhite flex flex-col justify-between items-center gap-14">
      <div class="w-full text-center flex flex-col justify-between">
        <div class="flex flex-col gap-6">
          <h2 class="title-sections" v-html="servicos.title"></h2>
          <p class="subtitle-sections" v-html="servicos.subtitle"></p>
          <p class="text-sections" v-html="servicos.text"></p>
        </div>
      </div>
      <div class="cards-scroll cards-scroll-icone md:grid-cols-3 mt-16">
        <div v-for="(item, index) in servicos.items" :key="index" class="card cards-scroll-item">
          <div class="bg-offWhite rounded-full border-theme2 border w-fit h-fit p-4 mx-auto -mt-10">
            <Icon :name="item.icon" size="48" class="block" />
          </div>
          <h3 class="h-16">{{ item.title }}</h3>
          <h4>{{ item.text }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'

const content = await useContentCustom()
const servicos = content.servicos

</script>

<style scoped>
#servicos {
  @apply bg-leftVector bg-left-bottom bg-no-repeat bg-contain lg:bg-auto;
}
</style>