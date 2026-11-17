import { gtmId } from '~/utils/constants/analytics.constant'
import { lerEscolhaSalva, type Escolha } from '~/composables/useConsentimento'

/**
 * Google Tag Manager (o GA4 vem por dentro dele).
 *
 * Tres decisoes de proposito:
 * 1) Sem ID configurado, NADA e carregado (o site segue sem tag nenhuma).
 * 2) LGPD, decisao do Felipe em 17/11/2026: MEDICAO por legitimo interesse,
 *    com direito de recusar. Mede desde a primeira visita; o aviso so informa.
 *    Quem clica em "Nao quero ser medido" nao carrega mais o GTM e tem os
 *    cookies do GA apagados. (O modelo "pedir antes" foi testado no mesmo dia e
 *    descartado: quem recusa some dos numeros, e quase todo mundo recusa.)
 *    ANUNCIO (ad_storage etc.) segue negado: se um dia entrar Pixel, ele pede
 *    permissao ANTES. Processo: docs/processos/medicao-cliente-ga4-search-console.md
 * 3) O GTM so e baixado DEPOIS que a imagem principal termina. Eventos
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
  // Antes de tudo: o que acontecer ate o GTM chegar fica guardado aqui.
  w.dataLayer = w.dataLayer || []
  // Os comandos de consentimento precisam ir no formato do gtag ("arguments"),
  // por isso funcao comum e nao arrow.
  const gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
  } as (...args: unknown[]) => void

  const salvo = lerEscolhaSalva()
  useState<Escolha | null>('consentimento', () => null).value = salvo

  gtag('consent', 'default', {
    analytics_storage: salvo === 'recusado' ? 'denied' : 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

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

  /** Espera a imagem principal (LCP), com teto e atalho na primeira interacao. */
  const agendarDepoisDoLcp = () => {
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
  }

  /** Recusou depois de ter aceito: apaga os cookies do GA4 deste navegador. */
  const apagarCookiesDoGa = () => {
    // O GA grava no dominio "pai" mais alto que aceitar cookie (ex.: .tshdevelop.com
    // na homologacao), entao tenta todos: a.b.c, .a.b.c, .b.c
    const partes = location.hostname.split('.')
    const dominios = ['']
    for (let i = 0; i < partes.length - 1; i++) {
      const d = partes.slice(i).join('.')
      dominios.push(d, '.' + d)
    }
    document.cookie
      .split(';')
      .map((c) => c.split('=')[0].trim())
      .filter((nome) => nome === '_ga' || nome.startsWith('_ga_'))
      .forEach((nome) =>
        dominios.forEach((d) => {
          document.cookie = `${nome}=; Max-Age=0; path=/${d ? '; domain=' + d : ''}`
        }),
      )
  }

  // Quem recusou nao carrega nada. Todo o resto (inclusive quem ainda nao
  // respondeu o aviso) e medido.
  if (salvo !== 'recusado') agendarDepoisDoLcp()

  return {
    provide: {
      medicao: {
        aplicar(escolha: Escolha) {
          if (escolha === 'aceito') {
            gtag('consent', 'update', { analytics_storage: 'granted' })
            // "Ok" de quem ja estava sendo medido nao muda nada (carregar e
            // idempotente). Quem tinha recusado e voltou atras: carrega agora.
            naOciosidade()
          } else {
            gtag('consent', 'update', { analytics_storage: 'denied' })
            apagarCookiesDoGa()
          }
        },
      },
    },
  }
})
