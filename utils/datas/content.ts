// Conteúdo do site.
//
// Antes isto vivia em content/main.yml e era lido pelo @nuxt/content. O módulo
// carregava um motor de query, um banco client-side e rotas de API só para ler
// UM arquivo: ~59KB de JavaScript sem uso na página. Como o conteúdo é estático
// e de um arquivo só, virou este módulo TypeScript.
//
// Para editar textos do site, edite AQUI.

export const siteContent = {
  "hero": {
    "title": "Sonhar é realizar,<br/>viajar é economizar"
  },
  "quemSomos": {
    "title": "Quem somos",
    "text": "A PerezTour nasceu com o intuito de facilitar a vida dos viajantes, pessoas assim como eu que amam viajar e gostam de organizar suas viagens sem preocupações. Nós estamos aqui para facilitar sua vida: organizaremos sua viagem, planejaremos de acordo com o seu destino e te daremos suporte do início ao fim.",
    "destaqueLabel": "O nosso diferencial",
    "destaque": "Nossos concorrentes finalizam o atendimento quando o cliente finaliza o pagamento. Nós iniciamos o nosso atendimento quando nosso cliente finaliza o pagamento, e terminamos quando ele termina sua viagem.",
    "missao": "Nossa missão é tornar cada viagem uma experiência única, livre de preocupações e marcada por qualidade e conforto. Na Perez Consulting Tour, acreditamos que viajar é mais que um deslocamento; é uma oportunidade de enriquecer a vida, e estamos aqui para  judar nossos clientes a realizarem esse sonho com tranquilidade e economia. Oferecemos acompanhamento completo, do planejamento até o retorno, garantindo uma experiência sem perrengues e com todo o suporte necessário para que cada etapa da jornada seja memorável.",
    "visao": "Nossa visão é revolucionar o setor de turismo no Brasil, trazendo uma abordagem que une excelência no atendimento e personalização, para que nossos clientes vivenciem o melhor de cada destino, sem imprevistos e com confiança.",
    "valores": "Nossos valores estão enraizados na honestidade, transparência e no compromisso com a satisfação dos nossos clientes. Atendemos com empatia e dedicação, proporcionando uma parceria verdadeira, em que todos saem ganhando. Na Perez Consulting Tour, cada viagem é planejada com  cuidado e atenção, refletindo o nosso respeito pelos sonhos e pelas necessidades de quem confia em nós para suas viagens",
    "cta": "Dúvidas?",
    "link": ""
  },
  "servicos": {
    "title": "Nossos serviços",
    "text": "Somos uma agência de viagens completa, fornecemos passagens aéreas, pacotes de viagens, hospedagens, Transfer, passeios pelo mundo inteiro.",
    "items": [
      {
        "icon": "fontisto:plane-ticket",
        "title": "Passagens aéreas ",
        "text": "Constitui-se em emissão de passagens aéreas nacional e mundial, para qualquer lugar do mundo que você queira viajar."
      },
      {
        "icon": "fontisto:plane-ticket",
        "title": "Pacotes viagens",
        "text": "Constitui-se em um pacote completo personalizado para o seu perfil de viajante, estruturaremos sua viagem, montaremos um roteiro, tudo personalizado exclusivo para você."
      },
      {
        "icon": "fontisto:plane-ticket",
        "title": "Assessoria para visto americano",
        "text": "Constitui-se em uma preparação para o visto americano, nos vamos te instruir e te preparar para a entrevista no consulado, fazemos toda a parte de preenchimento e envio de documentação, o que você precisa fazer é somente enviar informações para nós."
      }
    ]
  },
  "cotacao": {
    "title": "Peça sua cotação",
    "text": "Escolha o que você precisa e responda algumas perguntas rápidas. Sua solicitação vai direto para o nosso WhatsApp."
  },
  "consultoria": {
    "title": "Gestão High-Ticket",
    "text": "Esse é o nosso serviço premium do nosso portfólio, onde firmaremos um contrato de 12 meses, para que eu passe a gerenciar todas os seus pontos e milhas aéreas acumuladas nos seus cartões de crédito, eu potencializarei seu acúmulo, indicarei melhores cartões para seu perfil de gastos, planejarei suas viagens desde a emissão até o seu retorno, você tem total acesso a mim para viajar com suas próprias milhas, você viaja e quem executa somos nós.",
    "items": [
      {
        "icon": "fontisto:map-marker-alt",
        "title": "Plano Brasil",
        "text": "Ideal para famílias que pretendem viajar 2 ou mais vezes no ano dentro do Brasil, de acordo com o potencial de acúmulo, seja Nordeste, Sudeste, Sul e centro-oeste."
      },
      {
        "icon": "fontisto:map",
        "title": "Plano Americas",
        "text": "Ideal para famílias que pretendem viajar de 3 ou mais vezes, de acordo com o potencial de acúmulo, entre Brasil e Américas do Sul, podendo mesclar com cidades nacionais."
      },
      {
        "icon": "fontisto:world-o",
        "title": "Plano Americas/Europa",
        "text": "Ideal para famílias que pretendem viajar 3 ou mais vezes no ano pela Américas e Europa, de acordo com o potencial de acúmulo, podendo mesclar entre Américas (Incluindo EUA) e cidades pela Europa."
      },
      {
        "icon": "fontisto:earth",
        "title": "Plano Mundo",
        "text": "Ideal para famílias que pretendem viajar 3 ou mais vezes no ano pelo mundo inteiro, de acordo com o potencial de acúmulo, podendo mesclar entre Américas, Europa, Ásia e Oriente médio."
      }
    ]
  },
  "destaques": {
    "title": "Destaques",
    "subtitle": "Você paga menos<br/>pelo mesmo destino",
    "text": "Compare o preço que você encontra comprando por conta própria com o que você paga com a Perez Tour. A diferença está no planejamento da data, na emissão e no uso das milhas certas.",
    "nota": "Valores de exemplo. O preço final varia conforme a data, a disponibilidade e o momento da consulta.",
    "items": [
      {
        "title": "Miami",
        "text": "Compras, parques e praia no mesmo roteiro. A data escolhida muda bastante o preço da passagem.",
        "value": "3.175",
        "ourValue": "2.275",
        "economia": "900"
      },
      {
        "title": "Milão",
        "text": "Sua porta de entrada na Europa. De Milão você chega de trem a boa parte da Itália, sem precisar de outro voo.",
        "value": "4.325",
        "ourValue": "3.590",
        "economia": "735"
      },
      {
        "title": "Foz do Iguaçu",
        "text": "As Cataratas sem passaporte e sem voo longo. Cabe num feriado prolongado, com a família inteira.",
        "value": "1.190",
        "ourValue": "575",
        "economia": "615"
      }
    ]
  },
  "depoimentos": {
    "title": "Depoimentos",
    "subtitle": "Lorem ipsum dolor sit<br/>amet, consectetur",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue metus quis<br/> accumsan euismod. Maecenas sed est mollis, convallis nisi convallis, imperdiet massa.",
    "items": [
      {
        "user": "Depoimentos 1",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue metus quis accumsan euismod.",
        "destination": "Nova York - NY"
      },
      {
        "user": "Depoimentos 2",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue metus quis accumsan euismod.",
        "destination": "Nova York - NY"
      },
      {
        "user": "Depoimentos 3",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue metus quis accumsan euismod.",
        "destination": "Nova York - NY"
      },
      {
        "user": "Depoimentos 3",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue metus quis accumsan euismod.",
        "destination": "Nova York - NY"
      }
    ]
  }
} as const

export type SiteContent = typeof siteContent
