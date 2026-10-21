/**
 * Evento UNICO de contato: `click_whatsapp`, com a origem como parametro.
 *
 * Nao criar um evento por botao: no GA4 isso vira uma lista de eventos que
 * ninguem compara. Com um evento so, o relatorio responde "quantos contatos" e
 * "de onde vieram" na mesma tela.
 *
 * origem: hero | quemSomos | highTicket | flutuante | duvidaCotacao | cotacao
 */
export function rastrearWhatsApp(origem: string, extras: Record<string, unknown> = {}) {
  const gtag = (window as any)?.gtag
  if (typeof gtag !== 'function') return // sem ID configurado: nao faz nada
  gtag('event', 'click_whatsapp', { origem, ...extras })
}
