import { gtmId } from '~/utils/constants/analytics.constant'

/**
 * Google Tag Manager (o GA4 vem por dentro dele).
 *
 * Duas decisoes de proposito:
 * 1) Sem ID configurado, NADA e carregado (o site segue sem tag nenhuma).
 * 2) O GTM so e baixado DEPOIS que a imagem principal termina. Eventos
 *    disparados antes nao se perdem: ficam na fila do dataLayer e sao lidos
 *    quando o GTM chega.
 *
 * Por que NAO basta esperar o evento "load" (medido em 21/10/2026):
 * neste site o load dispara ~1,1s, antes mesmo da primeira pintura, porque a
 * imagem do topo entra depois, pela hidratacao. Esperando so o load, a tag
 * baixava junto com essa imagem e disputava banda com ela — exatamente o que
 * derruba a nota de performance, que aqui e promessa de venda. Por isso o gatilho
 * e o LCP: a gente observa a maior pintura e so carrega depois que ela para de
 * mudar.
 *
 * Sem o <noscript> do GTM de proposito: sem JavaScript o site nao funciona.
 */
export default defineNuxtPlugin(() => {
  if (!gtmId) return

  const w = window as any
  // Antes da espera: o que acontecer ate o GTM chegar fica guardado aqui.
  w.dataLayer = w.dataLayer || []

  let carregou = false
  const carregar = () => {
    if (carregou) return
    carregou = true
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    const s = document.createElement('script')
    s.async = true
    // Prioridade baixa: mesmo depois do LCP, a tag nao deve passar na frente
    // de nada que o visitante esteja esperando ver.
    s.setAttribute('fetchpriority', 'low')
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    document.head.appendChild(s)
  }

  const naOciosidade = () =>
    'requestIdleCallback' in w ? w.requestIdleCallback(carregar, { timeout: 2000 }) : setTimeout(carregar, 300)

  // Teto absoluto: se nada acontecer (aba em segundo plano, navegador sem
  // suporte), carrega assim mesmo. Sem isso, visita nenhuma seria medida.
  const teto = setTimeout(naOciosidade, 6000)

  const pronto = () => {
    clearTimeout(teto)
    naOciosidade()
  }

  try {
    let debounce: ReturnType<typeof setTimeout>
    const observador = new PerformanceObserver(() => {
      // Cada candidato a LCP reinicia a contagem: so seguimos quando a maior
      // pintura para de mudar por 1s.
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        observador.disconnect()
        pronto()
      }, 1000)
    })
    observador.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch {
    // navegador sem PerformanceObserver de LCP: fica so o teto
  }

  // Quem clica num CTA antes disso tudo precisa ser medido na hora.
  const porInteracao = () => pronto()
  addEventListener('pointerdown', porInteracao, { once: true, passive: true })
  addEventListener('keydown', porInteracao, { once: true })
})
