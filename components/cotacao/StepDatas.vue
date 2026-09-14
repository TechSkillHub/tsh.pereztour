<template>
  <Form v-slot="{ meta, errors }" class="contents" @submit="cotacao.nextStep()">
    <div class="flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6">
      <CotacaoRadioGroup
        legend="As datas precisam ser exatas ou têm flexibilidade?"
        name="flexibilidade"
        rules="required"
        v-model="cotacao.datasViajantes.flexibilidade"
        :options="[
          { value: 'exatas', label: 'Tenho datas exatas' },
          { value: 'ajustar', label: 'Posso ajustar as datas para economizar' },
        ]"
      />

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldInput
          id="cotacao-data-ida"
          name="dataIda"
          type="date"
          :label="labelDataIda"
          rules="required"
          v-model="cotacao.datasViajantes.dataIda"
          :has-error="!!errors.dataIda"
        />
        <FieldInput
          id="cotacao-data-volta"
          name="dataVolta"
          type="date"
          :label="labelDataVolta"
          :min="minVolta"
          :rules="minVolta ? `required|depoisDe:${minVolta}` : 'required'"
          v-model="cotacao.datasViajantes.dataVolta"
          :has-error="!!errors.dataVolta"
        />
      </div>

      <div class="max-w-[160px]">
        <label for="cotacao-noites" class="block text-sm font-medium leading-6 text-gray-900">
          Noites
        </label>
        <!-- Somente leitura: as noites vem SO das datas (pedido do cliente). -->
        <input
          id="cotacao-noites"
          type="text"
          readonly
          aria-readonly="true"
          :value="cotacao.datasViajantes.noites ?? ''"
          class="block w-full cursor-default rounded-md border-0 bg-gray-100 py-1.5 px-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 outline-none"
        />
        <p class="mt-1 text-xs text-grayTheme">Calculado automaticamente pelas datas.</p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label for="cotacao-adultos" class="block text-sm font-medium leading-6 text-gray-900">
            Adultos
          </label>
          <input
            id="cotacao-adultos"
            type="number"
            min="1"
            v-model.number="cotacao.datasViajantes.adultos"
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme1 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
        <div>
          <label for="cotacao-criancas" class="block text-sm font-medium leading-6 text-gray-900">
            Crianças
          </label>
          <input
            id="cotacao-criancas"
            type="number"
            min="0"
            :value="cotacao.datasViajantes.criancas"
            @input="onCriancasInput"
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme1 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      <div v-if="cotacao.datasViajantes.criancas > 0" class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div v-for="(_, idx) in cotacao.datasViajantes.idadesCriancas" :key="idx">
          <label :for="`cotacao-idade-${idx}`" class="block text-xs font-medium leading-6 text-gray-900">
            Idade da criança {{ idx + 1 }}
          </label>
          <input
            :id="`cotacao-idade-${idx}`"
            type="number"
            min="0"
            max="17"
            v-model="cotacao.datasViajantes.idadesCriancas[idx]"
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme1 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      <div v-if="mostraBagagem">
        <CotacaoRadioGroup
          legend="Precisa de bagagem despachada?"
          name="bagagem"
          rules="required"
          v-model="cotacao.datasViajantes.bagagem"
          microcopy="Bagagem despachada é a que vai no porão do avião, além da bagagem de mão."
          :options="[
            { value: 'todos', label: 'Para todos os viajantes' },
            { value: 'alguns', label: 'Para alguns viajantes' },
            { value: 'nao', label: 'Não' },
            { value: 'naoSei', label: 'Ainda não sei' },
          ]"
        />
      </div>
    </div>

    <CotacaoStepFooter :can-advance="meta.valid" />
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useCotacaoStore } from '~/stores/cotacao.store'

const cotacao = useCotacaoStore()

const ehHospedagem = computed(() => cotacao.tripType === 'hospedagem')
const labelDataIda = computed(() => (ehHospedagem.value ? 'Data de check-in' : 'Data de ida'))
const labelDataVolta = computed(() => (ehHospedagem.value ? 'Data de check-out' : 'Data de volta'))

// "Só hospedagem" não pergunta bagagem despachada (não há voo).
const mostraBagagem = computed(() => cotacao.tripType !== 'hospedagem')

function onCriancasInput(e: Event) {
  const target = e.target as HTMLInputElement
  cotacao.setCriancas(Number(target.value))
}

// "2026-10-22" + 1 dia, em horario local (sem virar o dia por fuso)
function somaDias(iso: string, dias: number) {
  const [a, m, d] = iso.split('-').map(Number)
  const data = new Date(a, m - 1, d + dias)
  const mm = String(data.getMonth() + 1).padStart(2, '0')
  const dd = String(data.getDate()).padStart(2, '0')
  return `${data.getFullYear()}-${mm}-${dd}`
}

// A volta so pode ser a partir do dia SEGUINTE a ida (pelo menos 1 noite).
const minVolta = computed(() =>
  cotacao.datasViajantes.dataIda ? somaDias(cotacao.datasViajantes.dataIda, 1) : undefined
)

// Se a ida mudar para depois da volta ja escolhida, a volta fica invalida:
// limpa em vez de deixar um intervalo impossivel preenchido.
watch(
  () => cotacao.datasViajantes.dataIda,
  () => {
    const { dataVolta } = cotacao.datasViajantes
    if (dataVolta && minVolta.value && dataVolta < minVolta.value) {
      cotacao.datasViajantes.dataVolta = ''
    }
  }
)

watch(
  () => [cotacao.datasViajantes.dataIda, cotacao.datasViajantes.dataVolta],
  () => cotacao.recalcularNoites()
)
</script>
