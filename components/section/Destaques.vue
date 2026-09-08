<template>
  <div class="py-24 text-offWhite">
    <div class="container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="title-sections mb-4" v-html="destaques.title"></h2>
        <p class="subtitle-sections mb-6" v-html="destaques.subtitle"></p>
        <p class="text-sections font-light leading-relaxed" v-html="destaques.text"></p>
      </div>

      <div class="cards-scroll md:grid-cols-3 mt-16">
        <article
          v-for="item in destaques.items"
          :key="item.title"
          class="cards-scroll-item relative flex flex-col overflow-hidden rounded-2xl bg-offWhite text-theme1"
        >
          <!-- selo de economia -->
          <span
            class="absolute right-0 top-6 rounded-l-full bg-theme3 py-2 pl-5 pr-6 text-sm font-semibold uppercase tracking-wide text-theme1"
          >
            Economize R$ {{ item.economia }}<span aria-hidden="true">*</span>
          </span>

          <div class="flex flex-1 flex-col px-8 pb-8 pt-20">
            <h3 class="text-3xl font-semibold uppercase leading-tight text-theme2Dark">{{ item.title }}</h3>
            <p class="mt-4 flex-1 font-light leading-relaxed">{{ item.text }}</p>

            <p class="mt-8 text-sm text-darkTheme">
              Comprando por conta própria
              <span class="ml-1 font-semibold line-through decoration-theme2 decoration-2">R$ {{ item.value }},00</span>
            </p>
          </div>

          <!-- preco final: o numero que importa, em bloco solido -->
          <div class="bg-theme2 px-8 py-6 text-theme1">
            <p class="text-xs font-semibold uppercase tracking-widest">Com a Perez Tour</p>
            <p class="mt-1 text-4xl font-bold leading-none">
              R$ {{ item.ourValue }}<span class="text-2xl">,00</span>
            </p>
          </div>
        </article>
      </div>

      <p class="mx-auto mt-10 max-w-3xl text-center text-sm text-grayTheme">
        <span aria-hidden="true">*</span> {{ destaques.nota }}
      </p>

      <div class="mt-12 flex justify-center">
        <FieldButton type="button" class="!w-auto max-w-full !px-6 !text-lg md:whitespace-nowrap md:!px-14 md:!text-2xl" @click="cotacao.openModal('pacote')">
          QUERO UMA COTAÇÃO ASSIM
        </FieldButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'
import { useCotacaoStore } from '~/stores/cotacao.store'

const content = await useContentCustom()
const destaques = content.destaques
const cotacao = useCotacaoStore()
</script>

<style scoped>
#destaques {
  @apply bg-leftVector bg-left-bottom bg-no-repeat bg-contain lg:bg-auto;
}
</style>
