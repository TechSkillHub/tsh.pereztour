<template>
  <div class="container relative flex justify-end z-0">
    <!-- Sobe acima do aviso de cookies enquanto ele estiver aberto no celular
         (a altura vem do AvisoCookies.vue; sem aviso, a variavel e 0).
         transform e nao "bottom": mover com transform nao conta como layout shift (CLS). -->
    <div class="fixed bottom-8 transition-transform duration-300" style="transform: translateY(calc(-1 * var(--aviso-cookies-altura, 0px)))">
      <NuxtLink
        :href="whatsApp"
        @click="rastrearWhatsApp('flutuante')"
        target="_blank"
        aria-label="Falar com a Perez Tour no WhatsApp"
        class="block leading-none"
      >
        <Icon name="logos:whatsapp-icon" size="60" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { whatsApp } from '~/utils/datas/whatsapp.data'
import { rastrearWhatsApp } from '~/composables/useAnalytics'


</script>

<style scoped>

</style>