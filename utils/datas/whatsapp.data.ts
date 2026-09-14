export const number = '+5511966192321'

/** wa.me exige só dígitos — sem "+" e sem separadores. */
const phoneDigits = number.replace(/\D/g, '')

/**
 * Mensagens dos CTAs diretos (os que abrem o WhatsApp sem passar pelo formulário).
 * Cada origem tem texto próprio de propósito: é o que permite saber de onde veio o
 * contato quando a mensagem chega. Quando o GA4 entrar, isso vira parâmetro de um
 * evento único `click_whatsapp` — não criar um evento por botão.
 */
export const ctaMessages = {
  hero: 'Olá! Vim pelo site e quero economizar na minha próxima viagem.',
  quemSomos: 'Olá! Li sobre a Perez Tour no site e fiquei com uma dúvida.',
  highTicket: 'Olá! Quero saber mais sobre a Gestão High-Ticket de pontos e milhas.',
  flutuante: 'Olá! Gostaria de mais informações.',
} as const

export type CtaOrigin = keyof typeof ctaMessages

export function buildCtaWhatsAppLink(origin: CtaOrigin): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(ctaMessages[origin])}`
}

/** Mantido para quem já importava `whatsApp` direto (botão flutuante). */
export const whatsApp = buildCtaWhatsAppLink('flutuante')

export type TripType = 'pacote' | 'passagem' | 'hospedagem'

const tripTypeLabels: Record<TripType, string> = {
  pacote: 'Pacote completo (voo + hotel)',
  passagem: 'Só passagem aérea',
  hospedagem: 'Só hospedagem',
}

const aeroportoLabels: Record<string, string> = {
  sim: 'Sim',
  nao: 'Não',
  mostrar: 'Podem me mostrar as opções',
}

const bagagemLabels: Record<string, string> = {
  todos: 'Para todos os viajantes',
  alguns: 'Para alguns viajantes',
  nao: 'Não',
  naoSei: 'Ainda não sei',
}

const faixaLabels: Record<string, string> = {
  economico: '$ Econômico',
  confortavel: '$$ Confortável',
  maisConforto: '$$$ Mais conforto',
}

const investimentoLabels: Record<string, string> = {
  tenho: 'Já tenho um valor aproximado',
  conhecerPrecos: 'Quero conhecer os preços primeiro',
}

function formatDateBR(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return ''
  return `${d}/${m}/${y}`
}

export interface CotacaoWhatsAppPayload {
  tripType: TripType
  nome: string
  whatsapp: string
  origem: string
  aeroportoAlternativo: string
  destino: string
  dataIda: string
  dataVolta: string
  noites: number | null
  adultos: number
  criancas: number
  idadesCriancas: string[]
  bagagem: string
  faixa: string
  preferenciaHotel: string
  investimento: string
  valorInvestimento: string
}

/**
 * Monta a mensagem de cotação exatamente no formato validado com o Felipe:
 * campos vazios/irrelevantes para o tipo de viagem escolhido não entram na mensagem.
 */
export function buildCotacaoMessage(payload: CotacaoWhatsAppPayload): string {
  const lines: string[] = ['SOLICITAÇÃO DE COTAÇÃO']

  if (payload.nome) lines.push(`👤 Nome: ${payload.nome}`)
  if (payload.whatsapp) lines.push(`📱 WhatsApp: ${payload.whatsapp}`)
  lines.push(`🧳 Tipo de viagem: ${tripTypeLabels[payload.tripType]}`)

  if (payload.tripType !== 'hospedagem') {
    if (payload.origem) lines.push(`✈️ Origem: ${payload.origem}`)
    if (payload.aeroportoAlternativo && aeroportoLabels[payload.aeroportoAlternativo]) {
      lines.push(`🔁 Aeroporto alternativo: ${aeroportoLabels[payload.aeroportoAlternativo]}`)
    }
  }

  if (payload.destino) lines.push(`📍 Destino: ${payload.destino}`)

  if (payload.dataIda && payload.dataVolta) {
    lines.push(`📅 Datas: ${formatDateBR(payload.dataIda)} a ${formatDateBR(payload.dataVolta)}`)
  } else if (payload.dataIda) {
    lines.push(`📅 Data de ida: ${formatDateBR(payload.dataIda)}`)
  } else if (payload.dataVolta) {
    lines.push(`📅 Data de volta: ${formatDateBR(payload.dataVolta)}`)
  }

  if (payload.noites) lines.push(`🌙 Noites: ${payload.noites}`)

  lines.push(`🧑 Adultos: ${payload.adultos}`)

  if (payload.criancas > 0) {
    const idades = payload.idadesCriancas.filter(Boolean)
    const idadesTexto = idades.length ? ` (${idades.join(', ')} anos)` : ''
    lines.push(`🧒 Crianças: ${payload.criancas}${idadesTexto}`)
  } else {
    lines.push('🧒 Crianças: 0')
  }

  if (payload.tripType !== 'hospedagem' && payload.bagagem && bagagemLabels[payload.bagagem]) {
    lines.push(`🧳 Bagagem despachada: ${bagagemLabels[payload.bagagem]}`)
  }

  if (payload.tripType !== 'passagem') {
    if (payload.faixa && faixaLabels[payload.faixa]) {
      lines.push(`🏨 Hospedagem: ${faixaLabels[payload.faixa]}`)
    }
    if (payload.preferenciaHotel) {
      lines.push(`🏨 Preferência de hotel: ${payload.preferenciaHotel}`)
    }
  }

  if (payload.investimento && investimentoLabels[payload.investimento]) {
    const valor =
      payload.investimento === 'tenho' && payload.valorInvestimento
        ? ` (R$ ${payload.valorInvestimento})`
        : ''
    lines.push(`💰 Investimento: ${investimentoLabels[payload.investimento]}${valor}`)
  }

  return lines.join('\n')
}

export function buildCotacaoWhatsAppLink(payload: CotacaoWhatsAppPayload): string {
  const message = buildCotacaoMessage(payload)
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`
}

/** Link de dúvida pontual durante o preenchimento, com mensagem diferente da cotação. */
export function buildDuvidaWhatsAppLink(): string {
  const text2 = 'Olá! Estou preenchendo uma cotação no site e tenho uma dúvida.'
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text2)}`
}