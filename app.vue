<template>
  <ElementsModal />
  <ElementsLoading />
  <!-- Lazy + v-if: o chunk da modal (vee-validate + os passos do formulario)
       so e baixado quando alguem abre a cotacao. -->
  <LazyCotacaoModal v-if="cotacao.show" />
  <!-- So no navegador: a escolha de cookies mora no localStorage. -->
  <ClientOnly><ElementsAvisoCookies /></ClientOnly>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { generateMeta } from '@/utils/constants/generateMeta';
import { title } from '@/utils/constants/seo.constant';
import { useCotacaoStore, tipoDaQuery } from '~/stores/cotacao.store';
import { rastrear } from '~/composables/useAnalytics';

const cotacao = useCotacaoStore();
const route = useRoute();

// Link direto para a cotacao (?cotacao=<tipo>). Fica AQUI, e nao na modal,
// porque a modal so e montada depois de aberta: la dentro ela nunca via o link.
onMounted(() => {
  if (!route.query.cotacao || cotacao.show) return
  const tipo = tipoDaQuery(route.query.cotacao)
  rastrear('abrir_cotacao', { origem: 'url', tipoViagem: tipo })
  cotacao.openModal(tipo)
})

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
