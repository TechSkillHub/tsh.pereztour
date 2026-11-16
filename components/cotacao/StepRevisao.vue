<template>
  <Form class="contents" @submit="handleEnviar">
    <div class="flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6">
      <dl class="divide-y divide-theme1/10 rounded-lg border border-theme1/10">
        <div class="flex items-start justify-between gap-4 p-3">
          <div>
            <dt class="text-xs font-semibold uppercase text-grayTheme">Tipo de viagem</dt>
            <dd class="text-sm text-darkTheme">{{ tripTypeLabel }}</dd>
          </div>
        </div>

        <div class="flex items-start justify-between gap-4 p-3">
          <div>
            <dt class="text-xs font-semibold uppercase text-grayTheme">Contato</dt>
            <dd class="text-sm text-darkTheme">
              {{ cotacao.contato.nome || '—' }} · {{ cotacao.contato.whatsapp || '—' }}
            </dd>
          </div>
          <button type="button" class="shrink-0 text-xs font-semibold text-theme2 underline" @click="cotacao.goToStep(1)">
            Editar contato
          </button>
        </div>

        <div class="flex items-start justify-between gap-4 p-3">
          <div>
            <dt class="text-xs font-semibold uppercase text-grayTheme">Origem e destino</dt>
            <dd class="text-sm text-darkTheme">
              <span v-if="mostraOrigem">{{ cotacao.origemDestino.origem || '—' }} → </span>
              {{ cotacao.origemDestino.destino || '—' }}
            </dd>
          </div>
          <button type="button" class="shrink-0 text-xs font-semibold text-theme2 underline" @click="cotacao.goToStep(2)">
            Editar origem e destino
          </button>
        </div>

        <div class="flex items-start justify-between gap-4 p-3">
          <div>
            <dt class="text-xs font-semibold uppercase text-grayTheme">Datas e viajantes</dt>
            <dd class="text-sm text-darkTheme">
              {{ datasResumo }}<br />
              {{ cotacao.datasViajantes.adultos }} adulto(s), {{ cotacao.datasViajantes.criancas }} criança(s)
            </dd>
          </div>
          <button type="button" class="shrink-0 text-xs font-semibold text-theme2 underline" @click="cotacao.goToStep(3)">
            Editar datas e viajantes
          </button>
        </div>

        <div v-if="mostraHospedagem" class="flex items-start justify-between gap-4 p-3">
          <div>
            <dt class="text-xs font-semibold uppercase text-grayTheme">Hospedagem</dt>
            <dd class="text-sm text-darkTheme">{{ faixaLabel || '—' }}</dd>
          </div>
          <button type="button" class="shrink-0 text-xs font-semibold text-theme2 underline" @click="cotacao.goToStep(4)">
            Editar hospedagem
          </button>
        </div>

        <div class="flex items-start justify-between gap-4 p-3">
          <div>
            <dt class="text-xs font-semibold uppercase text-grayTheme">Investimento</dt>
            <dd class="text-sm text-darkTheme">{{ investimentoLabel || 'Não informado' }}</dd>
          </div>
        </div>
      </dl>

      <p v-if="enviado" class="rounded-lg bg-success/10 p-3 text-sm font-medium text-success">
        Pedido enviado! Abrimos o WhatsApp para você concluir o envio.
      </p>
    </div>

    <CotacaoStepFooter :can-advance="true" continue-label="Enviar cotação pelo WhatsApp" />
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useCotacaoStore } from '~/stores/cotacao.store'
import { buildCotacaoWhatsAppLink } from '~/utils/datas/whatsapp.data'
import { rastrear } from '~/composables/useAnalytics'

const cotacao = useCotacaoStore()
const enviado = ref(false)

const mostraOrigem = computed(() => cotacao.tripType !== 'hospedagem')
const mostraHospedagem = computed(() => cotacao.tripType !== 'passagem')

const tripTypeLabel = computed(() => {
  return {
    pacote: 'Pacote completo (voo + hotel)',
    passagem: 'Só passagem aérea',
    hospedagem: 'Só hospedagem',
  }[cotacao.tripType]
})

function formatDateBR(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return ''
  return `${d}/${m}/${y}`
}

const datasResumo = computed(() => {
  const { dataIda, dataVolta, noites } = cotacao.datasViajantes
  if (!dataIda && !dataVolta) return 'Datas não informadas'
  const partes = [formatDateBR(dataIda), formatDateBR(dataVolta)].filter(Boolean).join(' a ')
  return noites ? `${partes} (${noites} noite${noites > 1 ? 's' : ''})` : partes
})

const faixaLabel = computed(() => {
  const labels: Record<string, string> = {
    economico: '$ Econômico',
    confortavel: '$$ Confortável',
    maisConforto: '$$$ Mais conforto',
  }
  return cotacao.hospedagem.faixa ? labels[cotacao.hospedagem.faixa] : ''
})

const investimentoLabel = computed(() => {
  if (cotacao.hospedagem.investimento === 'tenho') {
    return cotacao.hospedagem.valorInvestimento
      ? `Já tenho um valor aproximado (R$ ${cotacao.hospedagem.valorInvestimento})`
      : 'Já tenho um valor aproximado'
  }
  if (cotacao.hospedagem.investimento === 'conhecerPrecos') {
    return 'Quero conhecer os preços primeiro'
  }
  return ''
})

function handleEnviar() {
  // Honeypot preenchido = bot. Não envia, não avisa, apenas ignora.
  if (cotacao.contato.honeypot) return

  const link = buildCotacaoWhatsAppLink({
    tripType: cotacao.tripType,
    nome: cotacao.contato.nome,
    whatsapp: cotacao.contato.whatsapp,
    origem: cotacao.origemDestino.origem,
    aeroportoAlternativo: cotacao.origemDestino.aeroportoAlternativo,
    destino: cotacao.origemDestino.destino,
    dataIda: cotacao.datasViajantes.dataIda,
    dataVolta: cotacao.datasViajantes.dataVolta,
    noites: cotacao.datasViajantes.noites,
    adultos: cotacao.datasViajantes.adultos,
    criancas: cotacao.datasViajantes.criancas,
    idadesCriancas: cotacao.datasViajantes.idadesCriancas,
    bagagem: cotacao.datasViajantes.bagagem,
    faixa: cotacao.hospedagem.faixa,
    preferenciaHotel: cotacao.hospedagem.preferenciaHotel,
    investimento: cotacao.hospedagem.investimento,
    valorInvestimento: cotacao.hospedagem.valorInvestimento,
  })

  // Cotacao concluida = o lead. Evento proprio (nao o click_whatsapp dos CTAs),
  // sem nenhum dado pessoal: so o tipo de viagem.
  rastrear('generate_lead', { origem: 'cotacao', tipoViagem: cotacao.tripType })

  window.open(link, '_blank')
  enviado.value = true

  // Dá tempo do usuário ver a confirmação antes de fechar e limpar o rascunho.
  setTimeout(() => {
    cotacao.resetAfterSubmit()
    enviado.value = false
  }, 1600)
}
</script>
