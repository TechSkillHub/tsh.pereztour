<template>
  <div class="flex items-center py-24">
    <div class="container text-white flex flex-col justify-between items-center gap-14">
      <div class="w-full text-center flex flex-col justify-between">
        <div class="flex flex-col gap-6">
          <h1 class="title-sections" v-html="servicos.title"></h1>
          <h2 class="subtitle-sections" v-html="servicos.subtitle"></h2>
          <p class="text-sections" v-html="servicos.text"></p>
        </div>
      </div>
      <div class="grid md:grid-cols-3 justify-between gap-14 mt-16">
        <div v-for="(item, index) in servicos.items" :key="index" class="card">
          <div class="bg-darkBg rounded-full border-secondary2 border w-fit h-fit p-4 mx-auto -mt-10">
            <Icon :name="item.icon" size="48" class="block" />
          </div>
          <h3>{{ item.title }}</h3>
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