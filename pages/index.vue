<template>
  <div>
    <SectionHero/>
    <SectionQuemSomos id="quem-somos"/>
    <SectionServicos id="servicos"/>
    <SectionConsultoria id="consultoria"/>
    <SectionDestaques id="destaques"/>
    <SectionDepoimentos id="depoimentos"/>
  </div>
  <!-- <div class="home bg-darkBg flex items-center justify-center flex-col text-white">
    <div class="container mx-auto text-center lg:gap-32 gap-16 flex flex-col items-center">
      
      <div class="flex gap-8 flex-col max-w-[600px]">
        <h1 class="lg:text-6xl text-4xl">
          Seja Bem-Vindo!
        </h1>
        <h2 class="lg:text-2xl text-lg">
          Enquanto preparamos uma melhor experiência para você, pode tirar suas dúvidas clicando no botão abaixo:
        </h2>
        <NuxtLink :href="whatsApp" target="_blank" aria-label="WhatsApp Link">
          <FieldButton class="w-fit mx-auto">Quero saber mais!</FieldButton>
        </NuxtLink>
      </div>
      <img src="@/assets/images/logo.png" alt="Logo Perez Tour" class="lg:w-1/4 w-2/3 mx-auto">
    </div>
  </div> -->
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'default'
});

</script>