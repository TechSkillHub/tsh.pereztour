<template>
  <div class="bg-darkTheme text-offWhite">
    <div class="container flex flex-col justify-center items-center h-screen">
      <h1 class="text-9xl font-bold mb-8 text-primary2">404</h1>
      <h2 class="text-4xl uppercase font-bold text-center">Página não encontrada</h2>
      <h3 class="text-2xl mt-24 mb-8">
        Voltar para 
        <NuxtLink to="/" class="underline">
          HOME
        </NuxtLink>
      </h3>
      <!-- {{ error.error.message }} -->
      <LogosBrand class="mt-8 border-2 p-8 px-16 rounded-md" />
    </div>
  </div>
</template>

<script setup lang="ts">
const error = defineProps(['error'])
</script>

<style scoped>
</style>