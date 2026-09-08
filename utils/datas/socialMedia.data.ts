// Links das redes sociais OCULTOS ate o cliente enviar os perfis reais.
// Os valores anteriores apontavam para as HOME das redes (https://instagram.com/,
// https://x.com/, https://facebook.com/, https://youtube.com/), sem perfil nenhum:
// clicar levava o visitante para fora do site sem chegar na Perez Tour.
//
// Para religar: preencher com as URLs dos perfis e descomentar.
// Lembrar de tambem adicionar o campo sameAs no JSON-LD (nuxt.config.ts).
//
// export const socialLinks = [
//   { title: 'Instagram', url: 'https://instagram.com/<perfil>', icon: 'fa6-brands:instagram' },
//   { title: 'Facebook',  url: 'https://facebook.com/<perfil>',  icon: 'fa6-brands:facebook' },
//   { title: 'YouTube',   url: 'https://youtube.com/@<perfil>',  icon: 'fa6-brands:youtube' },
//   { title: 'X',         url: 'https://x.com/<perfil>',         icon: 'fa6-brands:x-twitter' },
// ];

export const socialLinks: { title: string; url: string; icon: string }[] = [];
