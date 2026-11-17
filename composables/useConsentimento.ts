import { consentimentoChave } from '~/utils/constants/analytics.constant'

/**
 * Aviso de cookies (LGPD). Medicao por legitimo interesse, com direito de recusar
 * (decisao do Felipe em 17/11/2026; ver plugins/analytics.client.ts).
 *
 * - Sem escolha salva: mede, e o aviso aparece informando.
 * - "aceito" (botao "Ok"): mede e o aviso some.
 * - "recusado" ("Nao quero ser medido"): nao carrega mais a medicao; se ja
 *   tinha carregado, nega o consentimento e apaga os cookies do Google Analytics.
 * A escolha pode ser mudada a qualquer hora pelo rodape ("Preferencias de cookies").
 */
export type Escolha = 'aceito' | 'recusado'

export function lerEscolhaSalva(): Escolha | null {
  try {
    const salvo = JSON.parse(localStorage.getItem(consentimentoChave) || 'null')
    return salvo?.escolha === 'aceito' || salvo?.escolha === 'recusado' ? salvo.escolha : null
  } catch {
    return null // navegador sem localStorage (aba anonima restrita etc.): pergunta de novo
  }
}

function salvarEscolha(escolha: Escolha) {
  try {
    localStorage.setItem(consentimentoChave, JSON.stringify({ escolha, em: new Date().toISOString() }))
  } catch {
    // sem localStorage: vale so para esta pagina
  }
}

export function useConsentimento() {
  const escolha = useState<Escolha | null>('consentimento', () => null)
  const reaberto = useState<boolean>('avisoCookiesReaberto', () => false)
  // So vira true depois que o aviso monta no navegador. Antes disso (no HTML
  // gerado) o aviso nao existe, e assim a hidratacao nao diverge.
  const pronto = useState<boolean>('avisoCookiesPronto', () => false)

  const aberto = computed(() => pronto.value && (escolha.value === null || reaberto.value))

  const nuxtApp = useNuxtApp()

  function decidir(nova: Escolha) {
    salvarEscolha(nova)
    escolha.value = nova
    reaberto.value = false
    ;(nuxtApp as any).$medicao?.aplicar(nova)
  }

  return {
    escolha,
    aberto,
    pronto,
    reaberto,
    aceitar: () => decidir('aceito'),
    recusar: () => decidir('recusado'),
    reabrir: () => {
      reaberto.value = true
    },
  }
}
