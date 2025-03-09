<template>
  <div class="flex items-center py-24">
    <div class="container text-white flex flex-col justify-between items-center gap-14">
      <div class="w-full text-center flex flex-col justify-between">
        <div class="flex flex-col gap-6">
          <h1 class="title-sections" v-html="destaques.title"></h1>
          <h2 class="subtitle-sections" v-html="destaques.subtitle"></h2>
          <p class="text-sections" v-html="destaques.text"></p>
        </div>
      </div>
      <div class="grid md:grid-cols-3 justify-between gap-14 mt-10">
        <div v-for="(item, index) in destaques.items" :key="index" class="card">
          <h3>{{ item.title }}</h3>
          <h4>{{ item.text }}</h4>
          <div>
            <div class="bg-darkTheme rounded-full p-4 text-left leading-4 flex flex-col items-center justify-center gap-2 scale-75">
              <p class="block">
                Preço de mercado:
              </p>
              <p class="block text-3xl font-bold">
                R$ <span>{{ item.value }}</span>,00
              </p>
            </div>
            <div class="rounded-full mt-4 btn flex-col p-4 w-full gap-0">
              <p class="block text-lg">
                Preço PEREZ TOUR:
              </p>
              <p class="block text-4xl">
                R$ <span class="text-5xl">{{ item.ourValue }}</span>,00
              </p>
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
const destaques = content.destaques

</script>

<style scoped>

</style>