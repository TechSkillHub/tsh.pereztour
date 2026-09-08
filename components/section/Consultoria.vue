<template>
  <div class="py-24 text-offWhite">
    <div class="container">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <img
          src="@/assets/images/servicos/img1.webp"
          alt="Viagem planejada com pontos e milhas pela Perez Tour"
          loading="lazy"
          width="640"
          height="416"
          class="h-64 w-full rounded-2xl object-cover md:h-80 lg:h-[26rem]"
        />

        <div>
          <span
            class="mb-5 inline-block rounded-full border border-theme2 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-theme2"
          >
            Serviço premium · contrato de 12 meses
          </span>
          <h2 class="title-sections mb-5" v-html="consultoria.title"></h2>
          <p class="text-sections font-light leading-relaxed" v-html="consultoria.text"></p>

          <NuxtLink
            :href="buildCtaWhatsAppLink('highTicket')"
            target="_blank"
            rel="noopener"
            class="mt-8 inline-block"
          >
            <FieldButton type="button">QUERO SABER MAIS</FieldButton>
          </NuxtLink>
        </div>
      </div>

      <!-- escada de alcance: Brasil -> Americas -> Europa -> Mundo -->
      <p class="mb-8 mt-20 text-center text-sm font-semibold uppercase tracking-widest text-theme3">
        Escolha o alcance da sua gestão
      </p>

      <div class="cards-scroll md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(item, i) in consultoria.items"
          :key="item.title"
          class="cards-scroll-item flex flex-col rounded-2xl border border-grayTheme bg-black/20 p-7 transition-colors duration-300 hover:border-theme2"
        >
          <Icon :name="item.icon" size="34" class="block text-theme2" />

          <span class="mt-6 flex gap-1" role="img" :aria-label="`Alcance ${i + 1} de ${consultoria.items.length}`">
            <span
              v-for="n in consultoria.items.length"
              :key="n"
              aria-hidden="true"
              class="h-1 flex-1 rounded-full"
              :class="n <= i + 1 ? 'bg-theme2' : 'bg-darkTheme'"
            ></span>
          </span>

          <h3 class="mb-3 mt-5 flex min-h-[3.25rem] items-start text-xl font-semibold uppercase leading-tight text-theme2">{{ item.title }}</h3>
          <p class="text-sm font-light leading-relaxed">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'
import { buildCtaWhatsAppLink } from '~/utils/datas/whatsapp.data'

const content = await useContentCustom()
const consultoria = content.consultoria
</script>

<style scoped>
#consultoria {
  @apply bg-leftVector bg-left-top bg-no-repeat bg-contain lg:bg-auto;
}
</style>
