<template>
  <div class="flex items-center py-24">
    <div class="container">
      <div class="mx-auto mb-16 max-w-2xl text-center text-offWhite">
        <h2 class="title-sections mb-4" v-html="cotacaoContent.title"></h2>
        <p class="text-sections" v-html="cotacaoContent.text"></p>
      </div>

      <CotacaoTripTypeOptions @select="handleSelect" />

      <p class="mt-14 text-center text-sm text-grayTheme">
        Sem cadastro e sem compromisso. Você revisa tudo antes de enviar.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContentCustom } from '~/composables/useCustomContent'
import { useCotacaoStore } from '~/stores/cotacao.store'
import type { TripType } from '~/utils/datas/whatsapp.data'
import { rastrear } from '~/composables/useAnalytics'

const content = await useContentCustom()
const cotacaoContent = content.cotacao
const cotacao = useCotacaoStore()

function handleSelect(type: TripType) {
  rastrear('abrir_cotacao', { origem: 'cardTipoViagem', tipoViagem: type })
  cotacao.openModal(type)
}
</script>
