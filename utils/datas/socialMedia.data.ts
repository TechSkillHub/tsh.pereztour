// Redes sociais da Perez Tour. O Vinicius confirmou em 21/10/2026: a UNICA rede
// deles e o Instagram. Nao recolocar Facebook, YouTube e X "para preencher" —
// antes eles apontavam para a HOME das redes e levavam o visitante para fora do
// site sem chegar na agencia.
//
// Ao mexer aqui, mexer tambem no sameAs do JSON-LD (nuxt.config.ts): e de la que
// os buscadores e os motores generativos ligam o site ao perfil.
export const socialLinks: { title: string; url: string; icon: string }[] = [
  { title: 'Instagram', url: 'https://www.instagram.com/pereztour.of/', icon: 'fa6-brands:instagram' },
];
