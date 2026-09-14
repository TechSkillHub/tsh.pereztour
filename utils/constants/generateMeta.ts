import { title, description, siteName, url } from './seo.constant'

// Fonte unica dos metadados: seo.constant.ts.
// Para mudar titulo/descricao do site, edite la, nao aqui.
const defaultMeta = {
  pageTitle: title,
  description,
  siteName,
  contentType: 'website',
  url: url + '/',
  // Nome NOVO de proposito: WhatsApp/Facebook guardam a imagem pela URL, entao
  // trocar o arquivo mantendo o nome nao atualiza a previa de quem ja tem cache.
  socialBanner: url + '/og-image.jpg', // arquivo em public/, 1200x630
  bannerWidth: '1200',
  bannerHeight: '630',
  twitterCardType: 'summary_large_image'
}

export const generateMeta = (metaOverrides = {}) => {
  const meta = { ...defaultMeta, ...metaOverrides }

  return [
    { name: 'description', content: meta.description },

    // Open Graph
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:site_name', content: meta.siteName },
    { property: 'og:type', content: meta.contentType },
    { property: 'og:url', content: meta.url },
    { property: 'og:title', content: meta.pageTitle },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: meta.socialBanner },
    { property: 'og:image:width', content: meta.bannerWidth },
    { property: 'og:image:height', content: meta.bannerHeight },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:alt', content: 'Perez Consulting Tour: sonhar é realizar, viajar é economizar' },

    // Twitter
    { name: 'twitter:card', content: meta.twitterCardType },
    { name: 'twitter:url', content: meta.url },
    { name: 'twitter:title', content: meta.pageTitle },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.socialBanner },
  ]
}
