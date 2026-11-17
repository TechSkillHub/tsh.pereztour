<template>
  <article class="bg-theme1 pb-24 pt-[calc(var(--height-header)+2rem)] text-offWhite">
    <div class="container max-w-3xl">
      <h1 class="text-3xl font-bold md:text-5xl">Política de privacidade</h1>
      <p class="mt-3 text-sm text-grayTheme">Atualizada em 17 de novembro de 2026</p>

      <p class="mt-8 leading-relaxed">
        Esta página explica, sem juridiquês, quais dados o site pereztour.com.br usa, para quê e o que
        você pode pedir. Vale para quem visita o site e para quem pede uma cotação.
      </p>

      <section class="mt-12">
        <h2 class="politica-titulo">1. Quem é o responsável</h2>
        <p class="politica-texto">
          A Perez Tour (Perez Consulting Tour) é a controladora dos dados, nos termos da Lei Geral de
          Proteção de Dados (Lei nº 13.709/2018, a LGPD).
        </p>
        <ul class="politica-lista">
          <li>Nome empresarial: 57.199.901 Vinicius Luciano de Oliveira Perez</li>
          <li>CNPJ: 57.199.901/0001-71</li>
          <li>
            Contato para assuntos de privacidade: WhatsApp
            <a :href="whatsApp" target="_blank" rel="noopener" class="politica-link">+55 11 96619-2321</a>
          </li>
        </ul>
        <p class="politica-texto">
          O site é desenvolvido e mantido pela TSH Digital, que atua como operadora: trata os dados só
          para manter o site e a medição funcionando, seguindo as instruções da Perez Tour.
        </p>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">2. Pedido de cotação</h2>
        <p class="politica-texto">
          <strong>O que entra:</strong> os campos que você preencher, como nome, WhatsApp, tipo de
          viagem, origem e destino, datas, número de adultos e crianças (com a idade de cada criança,
          sem nome), bagagem e preferências de hospedagem e de valor.
        </p>
        <p class="politica-texto">
          <strong>Como funciona:</strong> o formulário não envia nada para um servidor. No final, o site
          monta uma mensagem e abre o seu WhatsApp com ela. A mensagem só chega à Perez Tour quando
          você aperta enviar no WhatsApp.
        </p>
        <p class="politica-texto">
          <strong>Rascunho:</strong> enquanto você preenche, as respostas ficam guardadas só no seu
          navegador, para você não perder o que digitou se fechar a página. Depois do envio, o rascunho
          é apagado. Se você desistir no meio, ele continua só no seu navegador até você limpar os
          dados de navegação.
        </p>
        <p class="politica-texto">
          <strong>Para quê:</strong> preparar e responder a sua cotação. A base legal é a preparação de
          um contrato a seu pedido (art. 7º, V, da LGPD), junto com a autorização que você marca para a
          Perez Tour falar com você pelo WhatsApp.
        </p>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">3. Conversa pelo WhatsApp</h2>
        <p class="politica-texto">
          Quando você manda mensagem, pela cotação ou pelos botões do site, a conversa acontece no
          WhatsApp, serviço da Meta, que tem a própria política de privacidade. A Perez Tour usa o que
          você contar ali para cotar, reservar e acompanhar a sua viagem.
        </p>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">4. Medição de visitas (só se você aceitar)</h2>
        <p class="politica-texto">
          Se você clicar em "Aceitar" no aviso de cookies, o site carrega o Google Tag Manager e o
          Google Analytics, ferramentas do Google. Elas registram, sem o seu nome nem o seu número:
          páginas vistas, de onde você chegou, tipo de aparelho e navegador, cidade aproximada e quais
          botões foram usados (por exemplo, o botão do WhatsApp ou até qual etapa da cotação a pessoa
          chegou). O que você digita na cotação nunca entra nessa medição.
        </p>
        <p class="politica-texto">
          <strong>Para quê:</strong> saber quantas pessoas visitam o site e o que funciona melhor, para
          melhorar a página e o atendimento.
        </p>
        <p class="politica-texto">
          <strong>Base legal:</strong> o seu consentimento (art. 7º, I). Se você recusar, nada disso é
          carregado.
        </p>
        <p class="politica-texto">
          <strong>Prazo:</strong> o Google apaga os dados detalhados ligados ao seu navegador em até 14
          meses. Os números somados, como "visitas por mês", continuam nos relatórios.
        </p>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">5. Registros do servidor</h2>
        <p class="politica-texto">
          Como em todo site, o servidor que hospeda o pereztour.com.br anota cada acesso: endereço IP,
          data e hora, página pedida e navegador. Isso serve para segurança e para corrigir erros. Esses
          registros são apagados automaticamente depois de cerca de 15 dias. A base legal é o legítimo
          interesse em manter o site seguro e funcionando (art. 7º, IX).
        </p>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">6. Cookies e o que fica no seu navegador</h2>
        <div class="mt-4 overflow-x-auto rounded-lg border border-[#e8ebf7]/20">
          <table class="w-full min-w-[560px] text-left text-sm">
            <thead class="bg-[#e8ebf7]/10">
              <tr>
                <th scope="col" class="p-3 font-semibold">O quê</th>
                <th scope="col" class="p-3 font-semibold">Para quê</th>
                <th scope="col" class="p-3 font-semibold">Quando</th>
                <th scope="col" class="p-3 font-semibold">Por quanto tempo</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e8ebf7]/15 text-offWhite">
              <tr>
                <td class="p-3">Sua escolha no aviso de cookies (armazenamento local)</td>
                <td class="p-3">Lembrar se você aceitou ou recusou</td>
                <td class="p-3">Sempre que você escolhe</td>
                <td class="p-3">Até você limpar os dados do navegador</td>
              </tr>
              <tr>
                <td class="p-3">Rascunho da cotação (armazenamento local)</td>
                <td class="p-3">Não perder o que você digitou</td>
                <td class="p-3">Quando você preenche a cotação</td>
                <td class="p-3">Apagado depois do envio, ou até você limpar os dados do navegador</td>
              </tr>
              <tr>
                <td class="p-3">Cookies <code>_ga</code> e <code>_ga_23K170LB2N</code> (Google Analytics)</td>
                <td class="p-3">Diferenciar visitantes nas estatísticas</td>
                <td class="p-3">Só se você aceitar</td>
                <td class="p-3">Até 2 anos, ou até você recusar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">7. Com quem os dados são compartilhados</h2>
        <ul class="politica-lista">
          <li>Google (Google Analytics e Google Tag Manager), só se você aceitar a medição.</li>
          <li>Meta (WhatsApp), quando você manda mensagem.</li>
          <li>DigitalOcean, empresa que hospeda o servidor do site.</li>
        </ul>
        <p class="politica-texto">
          Essas empresas podem processar dados fora do Brasil, inclusive nos Estados Unidos. A Perez
          Tour não vende dados de ninguém.
        </p>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">8. Seus direitos</h2>
        <p class="politica-texto">
          A LGPD (art. 18) garante que você pode pedir: a confirmação de que tratamos dados seus e o
          acesso a eles; a correção; a anonimização, o bloqueio ou a eliminação do que for
          desnecessário; a portabilidade; a informação sobre com quem compartilhamos; e a revogação do
          consentimento a qualquer momento.
        </p>
        <p class="politica-texto">
          Para pedir, fale pelo WhatsApp
          <a :href="whatsApp" target="_blank" rel="noopener" class="politica-link">+55 11 96619-2321</a>.
          Você também pode reclamar na Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">9. Como mudar a sua escolha sobre cookies</h2>
        <p class="politica-texto">
          Use o link "Preferências de cookies" no rodapé de qualquer página, ou o botão abaixo. Se você
          recusar depois de ter aceitado, o site deixa de medir e apaga deste navegador os cookies do
          Google Analytics.
        </p>
        <button
          type="button"
          class="mt-5 rounded-md border-2 border-theme2 px-6 py-3 text-sm font-bold text-theme2 transition-colors hover:bg-theme2 hover:text-theme1"
          @click="reabrir"
        >
          Preferências de cookies
        </button>
      </section>

      <section class="mt-12">
        <h2 class="politica-titulo">10. Mudanças nesta política</h2>
        <p class="politica-texto">
          Se o site passar a coletar algo diferente, por exemplo com uma ferramenta nova, esta página é
          atualizada antes, com a nova data. Quando a mudança envolver cookies, o aviso volta a pedir a
          sua escolha.
        </p>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { url } from '~/utils/constants/seo.constant'
import { whatsApp } from '~/utils/datas/whatsapp.data'
import { useConsentimento } from '~/composables/useConsentimento'

const { reabrir } = useConsentimento()

const titulo = 'Política de privacidade | Perez Tour'
const descricao =
  'Quais dados o site da Perez Tour usa, para quê, por quanto tempo e como pedir acesso, correção ou exclusão.'

useHead({
  title: titulo,
  link: [{ rel: 'canonical', href: url + '/privacidade/' }],
  meta: [
    { name: 'description', content: descricao },
    { property: 'og:url', content: url + '/privacidade/' },
    { property: 'og:title', content: titulo },
    { property: 'og:description', content: descricao },
  ],
})
</script>

<style scoped>
.politica-titulo {
  @apply text-xl font-semibold text-theme3 md:text-2xl;
}
.politica-texto {
  @apply mt-4 leading-relaxed text-offWhite;
}
.politica-lista {
  @apply mt-4 list-disc space-y-2 pl-6 leading-relaxed text-offWhite;
}
.politica-link {
  @apply font-semibold text-theme2 underline underline-offset-2;
}
</style>
