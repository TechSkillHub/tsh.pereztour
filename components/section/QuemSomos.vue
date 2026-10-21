<template>
  <div class="py-24 text-offWhite">
    <div class="container">
      <div class="text-center">
        <h2 class="title-sections mb-6" v-html="quemSomos.title"></h2>
        <p class="text-sections font-light leading-relaxed" v-html="quemSomos.text"></p>
      </div>


      <div class="mt-20 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <!-- trilha: itinerario de Missao -> Visao -> Valores -->
        <ol class="relative">
          <li
            v-for="(pilar, i) in pilares"
            :key="pilar.label"
            class="relative flex gap-6 pb-12 last:pb-0 md:gap-8"
          >
            <span
              v-if="i < pilares.length - 1"
              aria-hidden="true"
              class="absolute left-[1.6875rem] top-16 bottom-0 w-px bg-grayTheme"
            ></span>

            <span
              class="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-theme2 bg-theme1"
            >
              <Icon :name="pilar.icon" size="22" class="block text-theme2" />
            </span>

            <div class="pt-3">
              <h3 class="mb-3 text-lg font-semibold uppercase tracking-wide text-theme3">{{ pilar.label }}</h3>
              <p class="text-sections font-light leading-relaxed" v-html="pilar.text"></p>
            </div>
          </li>
        </ol>

        <img
          src="@/assets/images/quemSomos/img1.webp"
          alt="Destino de viagem organizado pela Perez Tour"
          loading="lazy"
          width="640"
          height="416"
          class="hidden h-[26rem] w-full rounded-2xl object-cover lg:sticky lg:top-32 lg:block"
        />
      </div>

      <!-- diferencial: fecha a section, logo antes do CTA -->
      <figure class="mt-16 border-l-4 border-theme2 pl-6 md:pl-8">
        <figcaption class="mb-2 text-xs font-semibold uppercase tracking-widest text-theme2">
          {{ quemSomos.destaqueLabel }}
        </figcaption>
        <blockquote class="text-lg font-light leading-snug md:text-2xl" v-html="quemSomos.destaque"></blockquote>
      </figure>

      <div class="mt-14 text-center">
        <NuxtLink
          :href="buildCtaWhatsAppLink('quemSomos')"
          @click="rastrearWhatsApp('quemSomos')"
          target="_blank"
          rel="noopener"
          class="inline-block"
        >
          <FieldButton type="button">{{ quemSomos.cta }}</FieldButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'
import { buildCtaWhatsAppLink } from '~/utils/datas/whatsapp.data'
import { rastrearWhatsApp } from '~/composables/useAnalytics'

const content = await useContentCustom()
const quemSomos = content.quemSomos

const pilares = [
  { label: 'Missão', icon: 'fontisto:compass', text: quemSomos.missao },
  { label: 'Visão', icon: 'fontisto:eye', text: quemSomos.visao },
  { label: 'Valores', icon: 'fontisto:heart', text: quemSomos.valores },
]
</script>

<style scoped>
#quem-somos {
  @apply bg-rightVector bg-right-bottom bg-no-repeat bg-contain lg:bg-auto;
}
</style>
