<template>
  <div class="bg-footer text-footer w-full py-8 z-10 relative">
    <div class="container flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
      <div class="md:w-1/3 md:justify-start">
        <LogosBrand/>
      </div>
      <div class="md:w-1/3 flex justify-end gap-3">
        <IconsSocialIcon v-for="(item, index) in socialLinks" :key="index" :icon="item.icon" :url="item.url" />
      </div>
    </div>
    <div class="container mt-8 border-t border-offWhite pt-4">
      <small class="block text-center">© {{ ano }} Perez Tour Consulting. Todos os direitos reservados.</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { socialLinks } from '~/utils/datas/socialMedia.data';

// ano corrente para o copyright nao envelhecer sozinho
const ano = new Date().getFullYear();
</script>

<style scoped>

</style>
