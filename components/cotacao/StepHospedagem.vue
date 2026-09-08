<template>
  <Form v-slot="{ meta }" class="contents" @submit="cotacao.nextStep()">
    <div class="flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6">
      <div v-if="mostraEstiloHospedagem">
        <span class="mb-2 block text-sm font-medium leading-6 text-gray-900">
          Qual estilo de hospedagem você procura?
        </span>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label
            v-for="faixa in faixas"
            :key="faixa.value"
            class="cursor-pointer"
          >
            <Field
              type="radio"
              name="faixa"
              rules="required"
              :value="faixa.value"
              v-model="cotacao.hospedagem.faixa"
              class="peer sr-only"
            />
            <span
              :class="
                clsx(
                  'block rounded-xl border-2 px-4 py-4 text-center transition-colors',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-theme2',
                  cotacao.hospedagem.faixa === faixa.value
                    ? 'border-theme2 bg-theme2/10'
                    : 'border-gray-300 hover:border-theme2/60'
                )
              "
            >
              <span class="block text-lg font-bold text-theme1">{{ faixa.label }}</span>
              <span class="mt-1 block text-sm text-grayTheme">{{ faixa.text }}</span>
            </span>
          </label>
        </div>
        <transition name="fade" mode="out-in">
          <ErrorMessage name="faixa" class="mt-1 block text-xs text-red-500" />
        </transition>
      </div>

      <div v-if="mostraEstiloHospedagem">
        <label for="cotacao-hotel" class="block text-sm font-medium leading-6 text-gray-900">
          Tem preferência por algum hotel? (opcional)
        </label>
        <textarea
          id="cotacao-hotel"
          rows="3"
          v-model="cotacao.hospedagem.preferenciaHotel"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme1 sm:text-sm sm:leading-6 outline-none"
        />
        <p class="mt-1 text-xs text-grayTheme">Sujeito à disponibilidade no período da viagem.</p>
      </div>

      <div>
        <CotacaoRadioGroup
          legend="Você já tem uma faixa de investimento em mente? (opcional)"
          name="investimento"
          v-model="cotacao.hospedagem.investimento"
          :options="[
            { value: 'tenho', label: 'Já tenho um valor aproximado' },
            { value: 'conhecerPrecos', label: 'Quero conhecer os preços primeiro' },
          ]"
        />
        <div v-if="cotacao.hospedagem.investimento === 'tenho'" class="mt-3">
          <FieldInput
            id="cotacao-valor-investimento"
            name="valorInvestimento"
            label="Quanto imaginou investir no total da viagem?"
            rules=""
            v-model="cotacao.hospedagem.valorInvestimento"
            :has-error="false"
          />
        </div>
      </div>
    </div>

    <CotacaoStepFooter :can-advance="meta.valid" />
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import clsx from 'clsx'
import { useCotacaoStore } from '~/stores/cotacao.store'

const cotacao = useCotacaoStore()

// "Só passagem aérea" não pergunta estilo de hospedagem nem preferência de hotel.
const mostraEstiloHospedagem = computed(() => cotacao.tripType !== 'passagem')

const faixas = [
  { value: 'economico', label: '$ Econômico', text: 'Quero economizar' },
  { value: 'confortavel', label: '$$ Confortável', text: 'Quero equilibrar preço e conforto' },
  { value: 'maisConforto', label: '$$$ Mais conforto', text: 'Quero uma experiência mais completa' },
] as const
</script>
