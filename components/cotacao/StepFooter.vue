<template>
  <div class="flex shrink-0 items-center gap-3 border-t border-theme1/10 bg-offWhite px-6 py-4">
    <button
      v-if="showBack"
      type="button"
      class="btn btn-outlined !w-auto flex-1 !py-3 !text-base"
      @click="cotacao.prevStep()"
    >
      Voltar
    </button>
    <button
      type="submit"
      :disabled="!canAdvance"
      :class="clsx('btn !w-auto flex-1 !py-3 !text-base', !canAdvance && 'btn-disabled')"
    >
      {{ continueLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx'
import { useCotacaoStore } from '~/stores/cotacao.store'

const cotacao = useCotacaoStore()

withDefaults(
  defineProps<{
    canAdvance: boolean
    showBack?: boolean
    continueLabel?: string
  }>(),
  {
    showBack: true,
    continueLabel: 'Continuar',
  }
)
</script>
