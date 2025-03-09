<template>
  <ElementsHeader />
  
  <NuxtPage class="min-h-[calc(100vh-var(--height-header))] pt-header bg-darkBg home" />
  
  <!-- <ElementsWhatsApp />  -->
  
  <ElementsFooter/>
</template>

<script setup lang="ts">

</script>

<style scoped>
.home {
  @apply bg-vector1 bg-no-repeat bg-contain lg:bg-auto bg-fixed
}
.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
