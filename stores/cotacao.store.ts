import type { TripType } from '~/utils/datas/whatsapp.data'

export const TOTAL_STEPS = 5
const MAX_CRIANCAS = 10

/** Deep-link por query string (?cotacao=1 | pacote | passagem | hospedagem). */
export function tipoDaQuery(raw: unknown): TripType {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (value === 'passagem' || value === 'hospedagem' || value === 'pacote') return value
  return 'pacote'
}

export interface ContatoData {
  nome: string
  whatsapp: string
  autoriza: boolean
  honeypot: string
}

export interface OrigemDestinoData {
  origem: string
  aeroportoAlternativo: '' | 'sim' | 'nao' | 'mostrar'
  destino: string
}

export interface DatasViajantesData {
  flexibilidade: 'exatas' | 'ajustar'
  dataIda: string
  dataVolta: string
  noites: number | null
  adultos: number
  criancas: number
  idadesCriancas: string[]
  bagagem: '' | 'todos' | 'alguns' | 'nao' | 'naoSei'
}

export interface HospedagemData {
  faixa: '' | 'economico' | 'confortavel' | 'maisConforto'
  preferenciaHotel: string
  investimento: '' | 'tenho' | 'conhecerPrecos'
  valorInvestimento: string
}

interface CotacaoState {
  show: boolean
  step: number
  tripType: TripType
  contato: ContatoData
  origemDestino: OrigemDestinoData
  datasViajantes: DatasViajantesData
  hospedagem: HospedagemData
}

function defaultState(): CotacaoState {
  return {
    show: false,
    step: 1,
    tripType: 'pacote',
    contato: { nome: '', whatsapp: '', autoriza: false, honeypot: '' },
    origemDestino: { origem: '', aeroportoAlternativo: '', destino: '' },
    datasViajantes: {
      flexibilidade: 'exatas',
      dataIda: '',
      dataVolta: '',
      noites: null,
      adultos: 2,
      criancas: 0,
      idadesCriancas: [],
      bagagem: '',
    },
    hospedagem: { faixa: '', preferenciaHotel: '', investimento: '', valorInvestimento: '' },
  }
}

export const useCotacaoStore = defineStore('cotacao', {
  state: (): CotacaoState => defaultState(),

  getters: {
    totalSteps: () => TOTAL_STEPS,

    /** Existe algo preenchido que valha a pena confirmar antes de descartar? */
    hasProgress(state): boolean {
      const d = defaultState()
      return (
        state.contato.nome !== d.contato.nome ||
        state.contato.whatsapp !== d.contato.whatsapp ||
        state.contato.autoriza !== d.contato.autoriza ||
        state.origemDestino.origem !== d.origemDestino.origem ||
        state.origemDestino.destino !== d.origemDestino.destino ||
        state.origemDestino.aeroportoAlternativo !== d.origemDestino.aeroportoAlternativo ||
        state.datasViajantes.dataIda !== d.datasViajantes.dataIda ||
        state.datasViajantes.dataVolta !== d.datasViajantes.dataVolta ||
        state.datasViajantes.adultos !== d.datasViajantes.adultos ||
        state.datasViajantes.criancas !== d.datasViajantes.criancas ||
        state.datasViajantes.bagagem !== d.datasViajantes.bagagem ||
        state.hospedagem.faixa !== d.hospedagem.faixa ||
        state.hospedagem.preferenciaHotel !== d.hospedagem.preferenciaHotel ||
        state.hospedagem.investimento !== d.hospedagem.investimento
      )
    },
  },

  actions: {
    openModal(type: TripType = 'pacote') {
      this.tripType = type
      this.show = true
      if (process.client) document.body.style.overflow = 'hidden'
    },

    closeModal() {
      this.show = false
      if (process.client) document.body.style.overflow = ''
    },

    changeTripType(type: TripType) {
      this.tripType = type
      this.step = 1
    },

    goToStep(step: number) {
      this.step = Math.min(Math.max(step, 1), TOTAL_STEPS)
    },

    nextStep() {
      this.goToStep(this.step + 1)
    },

    prevStep() {
      this.goToStep(this.step - 1)
    },

    /** Recalcula noites a partir das datas. Chamado sempre que ida/volta mudam. */
    recalcularNoites() {
      const { dataIda, dataVolta } = this.datasViajantes
      if (!dataIda || !dataVolta) {
        this.datasViajantes.noites = null
        return
      }
      const ida = new Date(`${dataIda}T00:00:00`)
      const volta = new Date(`${dataVolta}T00:00:00`)
      const diff = Math.round((volta.getTime() - ida.getTime()) / 86400000)
      this.datasViajantes.noites = diff > 0 ? diff : null
    },

    /** Redimensiona o array de idades quando a quantidade de crianças muda. */
    setCriancas(n: number) {
      const count = Math.max(0, Math.min(Number(n) || 0, MAX_CRIANCAS))
      this.datasViajantes.criancas = count
      const arr = this.datasViajantes.idadesCriancas.slice(0, count)
      while (arr.length < count) arr.push('')
      this.datasViajantes.idadesCriancas = arr
    },

    /** Só é chamado depois do WhatsApp aberto com sucesso. */
    resetAfterSubmit() {
      Object.assign(this.$state, defaultState())
      if (process.client) document.body.style.overflow = ''
    },
  },

  persist: {
    paths: ['step', 'tripType', 'contato', 'origemDestino', 'datasViajantes', 'hospedagem'],
  } as any,
})
