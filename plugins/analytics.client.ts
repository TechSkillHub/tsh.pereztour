import { gaId } from '~/utils/constants/analytics.constant'

/**
 * Google Analytics 4.
 *
 * Duas decisoes de proposito:
 * 1) Sem ID configurado, NADA e carregado (o site segue sem tag nenhuma).
 * 2) A biblioteca do Google (~100KB) so e baixada DEPOIS do load da pagina,
 *    na ociosidade. Ela nao pode disputar banda com a imagem principal, que e
 *    o que a nota de performance mede. Eventos disparados antes disso nao se
 *    perdem: ficam na fila do dataLayer e sobem quando a biblioteca chega.
 */
export default defineNuxtPlugin(() => {
  if (!gaId) return

  const w = window as any
  w.dataLayer = w.dataLayer || []
  // A funcao precisa de "arguments" (o gtag usa o objeto cru), por isso nao e arrow.
  w.gtag = function gtag() {
    w.dataLayer.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', gaId)

  const carregar = () => {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(s)
  }

  const naOciosidade = () =>
    'requestIdleCallback' in window
      ? (window as any).requestIdleCallback(carregar, { timeout: 4000 })
      : setTimeout(carregar, 2000)

  if (document.readyState === 'complete') naOciosidade()
  else window.addEventListener('load', naOciosidade, { once: true })
})
