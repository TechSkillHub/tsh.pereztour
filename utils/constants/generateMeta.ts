import { title, description, siteName, url } from './seo.constant'

// Fonte unica dos metadados: seo.constant.ts.
// Para mudar titulo/descricao do site, edite la, nao aqui.
const defaultMeta = {
  pageTitle: title,
  description,
  siteName,
  contentType: 'website',
  url: url + '/',
  socialBanner: url + '/social_banner.jpg', // arquivo em public/
  bannerWidth: '740',
  bannerHeight: '300',
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

    // Twitter
    { name: 'twitter:card', content: meta.twitterCardType },
    { name: 'twitter:url', content: meta.url },
    { name: 'twitter:title', content: meta.pageTitle },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.socialBanner },
  ]
}
