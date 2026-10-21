<template>
  <div class="container relative flex justify-end z-0">
    <div class="fixed bottom-8">
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