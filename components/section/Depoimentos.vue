<template>
  <div class="flex items-center py-24">
    <div class="container text-white flex flex-col justify-between items-center gap-14">
      <div class="w-full text-center flex flex-col justify-between">
        <div class="flex flex-col gap-6">
          <h1 class="title-sections" v-html="depoimentos.title"></h1>
          <h2 class="subtitle-sections" v-html="depoimentos.subtitle"></h2>
          <p class="text-sections" v-html="depoimentos.text"></p>
        </div>
      </div>
      <div class="grid md:grid-cols-2 justify-between gap-14 mt-16">
        <div v-for="(item, index) in depoimentos.items" :key="index" class="bg-darkTheme rounded-2xl p-8 grid grid-flow-col gap-8">
          <div class="rounded-full !w-40 !h-40 bg-grayTheme"></div>
          <div class="w-full flex flex-col justify-between">
            <h4>{{ item.text }}</h4>
            <div class="text-right">
              <h3 class="text-xl font-bold text-secondary2">{{ item.user }}</h3>
              <h5 class="text-sm uppercase italic">{{ item.destination }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'

const content = await useContentCustom()
const depoimentos = content.depoimentos

</script>

<style scoped>

</style>