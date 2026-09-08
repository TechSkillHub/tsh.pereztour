<template>
  <div :class="compact ? 'grid grid-cols-1 gap-2 sm:grid-cols-3' : 'cards-scroll cards-scroll-icone md:grid-cols-3 mt-16'">
    <button
      v-for="tipo in tripTypes"
      :key="tipo.value"
      type="button"
      :class="
        compact
          ? clsx(
              'rounded-lg border-2 px-3 py-2 text-left text-sm transition-colors',
              selected === tipo.value ? 'border-theme2 bg-theme2/10' : 'border-gray-300 hover:border-theme2/60'
            )
          : clsx(
              'boarding-pass cards-scroll-item group relative flex flex-col rounded-2xl bg-offWhite text-left text-theme1',
              'transition-all duration-300 hover:-translate-y-2',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme2',
              selected === tipo.value && 'ring-2 ring-theme2'
            )
      "
      @click="$emit('select', tipo.value)"
    >
      <template v-if="compact">
        <span class="block font-semibold text-darkTheme">{{ tipo.title }}</span>
        <span class="block text-xs text-grayTheme">{{ tipo.text }}</span>
      </template>

      <template v-else>
        <span class="flex flex-1 flex-col px-8 pb-7 pt-9">
          <!-- carimbo: circulo TRACEJADO, diferente do circulo solido de Servicos -->
          <span
            class="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border-2 border-dashed border-theme2 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110"
          >
            <Icon :name="tipo.icon" size="38" class="block" />
          </span>

          <span class="mt-6 flex h-14 items-start text-2xl font-semibold uppercase leading-tight text-theme2Dark">
            {{ tipo.title }}
          </span>
          <span class="mt-1 block font-light leading-relaxed">{{ tipo.text }}</span>
        </span>

        <!-- picote: recortes laterais + linha tracejada -->
        <span class="relative block">
          <span aria-hidden="true" class="notch notch-left"></span>
          <span aria-hidden="true" class="notch notch-right"></span>
          <span class="mx-7 block border-t-2 border-dashed border-grayTheme"></span>
        </span>

        <!-- aba de embarque -->
        <span
          class="flex items-center justify-between gap-2 rounded-b-2xl px-8 py-5 text-sm font-semibold uppercase tracking-widest text-theme2Dark transition-colors duration-300 group-hover:bg-theme2 group-hover:text-theme1"
        >
          Pedir orçamento
          <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </span>
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx'
import { tripTypes } from '~/utils/cotacao/tripTypes'
import type { TripType } from '~/utils/datas/whatsapp.data'

defineProps<{
  compact?: boolean
  selected?: TripType
}>()

defineEmits<{
  select: [value: TripType]
}>()
</script>

<style scoped>
/* Os recortes usam a cor de fundo da pagina (theme1) para "furar" o cartao. */
.notch {
  @apply absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-theme1;
}
.notch-left {
  @apply -left-3;
}
.notch-right {
  @apply -right-3;
}
</style>
