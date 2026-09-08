import { siteContent } from '~/utils/datas/content'

// Mantém a assinatura antiga (async) para não mexer nos componentes que já
// fazem `await useContentCustom()`. O conteúdo agora é um módulo estático,
// sem o @nuxt/content por trás.
export const useContentCustom = async () => siteContent
