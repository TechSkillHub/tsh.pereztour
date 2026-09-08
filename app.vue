<template>
  <ElementsModal />
  <ElementsLoading />
  <!-- Lazy + v-if: o chunk da modal (vee-validate + os passos do formulario)
       so e baixado quando alguem abre a cotacao. -->
  <LazyCotacaoModal v-if="cotacao.show" />
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { generateMeta } from '@/utils/constants/generateMeta';
import { title } from '@/utils/constants/seo.constant';
import { useCotacaoStore } from '~/stores/cotacao.store';

const cotacao = useCotacaoStore();

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
