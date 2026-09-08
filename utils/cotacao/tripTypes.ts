import type { TripType } from '~/utils/datas/whatsapp.data'

export interface TripTypeDef {
  value: TripType
  title: string
  text: string
  /** Icone Iconify. Familia "fontisto", a mesma usada em Servicos/Consultoria. */
  icon: string
}

/**
 * Definição dos 3 cartões de tipo de viagem.
 * Títulos vieram literais do brief do Felipe; os subtítulos de "passagem" e
 * "hospedagem" foram escritos por mim no mesmo tom curto do site (ver relatório).
 */
export const tripTypes: TripTypeDef[] = [
  {
    value: 'pacote',
    title: 'Pacote completo',
    text: 'Voo e hospedagem organizados juntos, do embarque ao retorno.',
    icon: 'fontisto:suitcase',
  },
  {
    value: 'passagem',
    title: 'Só passagem aérea',
    text: 'Emissão de bilhetes para qualquer destino, nacional ou internacional.',
    icon: 'fontisto:plane-ticket',
  },
  {
    value: 'hospedagem',
    title: 'Só hospedagem',
    text: 'Encontramos o hotel ideal para a sua estadia.',
    icon: 'fontisto:hotel',
  },
]
