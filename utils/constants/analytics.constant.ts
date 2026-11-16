/**
 * ID do container do Google Tag Manager (formato "GTM-XXXXXXX").
 *
 * VAZIO = nenhuma tag e carregada e nenhum evento e enviado. O site funciona
 * igual, so nao mede. Para ligar: colar o ID aqui e gerar/subir de novo.
 *
 * O GA4 da Perez Tour (G-23K170LB2N) agora e configurado DENTRO do GTM, nao
 * aqui. Nao voltar a carregar o gtag.js direto: com os dois, cada visita conta
 * em dobro.
 *
 * As contas (GTM e GA4) ficam no login da TSH e podem ser passadas para o
 * cliente depois (ele vira Administrador, a TSH sai). O ID NAO muda nessa
 * passagem, entao isto aqui continua valendo.
 * Processo da casa: docs/processos/medicao-cliente-ga4-search-console.md
 */
export const gtmId = 'GTM-MRZ4QTHC'
