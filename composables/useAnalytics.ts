/**
 * Eventos de medicao, enviados ao dataLayer (o GTM le de la e repassa ao GA4).
 *
 *   click_whatsapp  { origem }              hero | quemSomos | highTicket | flutuante | duvidaCotacao
 *   abrir_cotacao   { origem, tipoViagem }  cardTipoViagem | destaquePacote | url
 *   etapa_cotacao   { etapa, tipoViagem }   etapa = 1 a 5, ao chegar em cada etapa da modal
 *   generate_lead   { origem, tipoViagem }  origem = 'cotacao', no envio da cotacao
 *   click_instagram { origem }              rodape
 *
 * NUNCA mandar dado pessoal da cotacao (nome, WhatsApp, datas, destino...).
 *
 * Um evento por ACAO, com a origem como parametro. Nao criar um evento por
 * botao: no GA4 isso vira uma lista que ninguem compara.
 */
type Parametros = {
  origem?: string
  tipoViagem?: string
  etapa?: number
}

export function rastrear(evento: string, params: Parametros = {}) {
  const dataLayer = (window as any)?.dataLayer
  if (!Array.isArray(dataLayer)) return // sem ID configurado: nao faz nada
  // O GTM guarda os valores entre um push e outro. Zerar os parametros antes
  // evita que o "etapa" de um evento apareca grudado no evento seguinte.
  dataLayer.push({ origem: undefined, tipoViagem: undefined, etapa: undefined, ...params, event: evento })
}

export function rastrearWhatsApp(origem: string) {
  rastrear('click_whatsapp', { origem })
}
