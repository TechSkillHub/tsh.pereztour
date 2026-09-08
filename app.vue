<template>
  <ElementsModal />
  <ElementsLoading />
  <CotacaoModal />
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { generateMeta } from '@/utils/constants/generateMeta';
import { title } from '@/utils/constants/seo.constant';

useHead({
  title,
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
