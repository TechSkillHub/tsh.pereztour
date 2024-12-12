<template>
  <ElementsModal />
  <ElementsLoading />
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { generateMeta } from '@/utils/constants/generateMeta';

useHead({
  title: 'Perez Consulting Tour',
  meta: generateMeta(),
  htmlAttrs: {
    lang: 'pt-BR',
  },
  script: [],
  link: []
})

</script>

<style>

</style>
