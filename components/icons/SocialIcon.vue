<template>
  <NuxtLink
    :href="url"
    target="_blank"
    :aria-label="label"
    class="inline-flex h-11 w-11 items-center justify-center"
  >
    <Icon :name="icon" size="20" />
  </NuxtLink>
</template>

<script setup lang="ts">
interface AuthSocialButtonProps {
  icon: string;
  url: string
}
const props = defineProps<AuthSocialButtonProps>();

// "Social Link" nao diz qual rede e. Derivar do nome do icone (ex.: "fontisto:instagram").
const label = computed(() => {
  const rede = (props.icon.split(":").pop() || "").replace(/[-_]/g, " ").trim();
  return rede ? "Perez Tour no " + rede : "Rede social da Perez Tour";
});
</script>

<style scoped>

</style>