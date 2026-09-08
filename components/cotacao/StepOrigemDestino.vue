<template>
  <Form v-slot="{ meta, errors }" class="contents" @submit="cotacao.nextStep()">
    <div class="flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6">
      <div v-if="mostraOrigem">
        <FieldInput
          id="cotacao-origem"
          name="origem"
          label="Cidade ou aeroporto de origem"
          rules="required"
          v-model="cotacao.origemDestino.origem"
          :has-error="!!errors.origem"
        />
        <p class="mt-1 text-xs text-grayTheme">Ex.: São Paulo ou GRU</p>
      </div>

      <CotacaoRadioGroup
        v-if="mostraOrigem"
        legend="Aceita embarcar por outro aeroporto próximo para economizar?"
        name="aeroportoAlternativo"
        rules="required"
        v-model="cotacao.origemDestino.aeroportoAlternativo"
        :options="[
          { value: 'sim', label: 'Sim' },
          { value: 'nao', label: 'Não' },
          { value: 'mostrar', label: 'Podem me mostrar as opções' },
        ]"
      />

      <FieldInput
        id="cotacao-destino"
        name="destino"
        label="Destino desejado"
        rules="required"
        v-model="cotacao.origemDestino.destino"
        :has-error="!!errors.destino"
      />
    </div>

    <CotacaoStepFooter :can-advance="meta.valid" />
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useCotacaoStore } from '~/stores/cotacao.store'

const cotacao = useCotacaoStore()

// "Só hospedagem" não envolve voo: não pergunta origem nem aeroporto alternativo.
const mostraOrigem = computed(() => cotacao.tripType !== 'hospedagem')
</script>
