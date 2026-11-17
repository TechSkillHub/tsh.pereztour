<template>
  <div class="bg-footer text-footer w-full py-8 z-10 relative">
    <div class="container flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
      <div class="md:w-1/3 md:justify-start">
        <LogosBrand/>
      </div>
      <div class="md:w-1/3 flex justify-end gap-3">
        <IconsSocialIcon
          v-for="(item, index) in socialLinks"
          :key="index"
          :icon="item.icon"
          :url="item.url"
          @click="item.title === 'Instagram' && rastrear('click_instagram', { origem: 'rodape' })"
        />
      </div>
    </div>
    <div class="container mt-8 border-t border-offWhite pt-4">
      <small class="block text-center">© {{ ano }} Perez Tour Consulting. Todos os direitos reservados.</small>
      <div class="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
        <NuxtLink to="/privacidade" class="underline underline-offset-2 hover:text-theme2">Política de privacidade</NuxtLink>
        <button type="button" class="underline underline-offset-2 hover:text-theme2" @click="reabrir">
          Preferências de cookies
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { socialLinks } from '~/utils/datas/socialMedia.data';
import { rastrear } from '~/composables/useAnalytics';
import { useConsentimento } from '~/composables/useConsentimento';

const { reabrir } = useConsentimento();

// ano corrente para o copyright nao envelhecer sozinho
const ano = new Date().getFullYear();
</script>

<style scoped>

</style>
