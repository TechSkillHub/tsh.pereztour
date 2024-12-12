<template>
  <nav class="fixed w-full p-6 bg-gray-100 text-header h-header flex shadow-md z-10 transition-all ease-in-out duration-700">
    <div class="flex items-center justify-between max-w-screen-xl mx-auto w-full">

      <!-- Header logo -->
      <div>
        <LogosBrand/>
      </div>
      
      <!-- Mobile toggle -->
      <div class="md:hidden">
        <button @click="drawer">
          <IconsHamburguer />
        </button>
      </div>

      <!-- Navbar -->
      <div class="hidden md:block">
        <ul class="flex space-x-8 text-sm font-sans items-center">
          <li v-for="(item, index) in headerNav" :key="index">
            <NuxtLink :to="item.link" >
              {{ item.title }}
            </NuxtLink>
          </li>          
        </ul>
      </div>      
    </div>
  </nav>

  <!-- Drawer Menu -->
  <aside class="p-5 transform top-0 left-0 w-full bg-gray-100 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-0" :class="isOpen ? 'translate-y-header' : '-translate-y-full'">
    <ul class="divide-y font-sans">
      <li v-for="(item, index) in headerNav" :key="index">
        <NuxtLink :to="item.link" @click="isOpen = false" class="my-4 inline-block">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>

    <div class="follow">
      <p class="italic font-sans text-sm">follow us:</p>
      <div class="social flex space-x-5 mt-4 ">
        <IconsSocialIcon v-for="(item, index) in socialLinks" :key="index" :icon="item.icon" :url="item.url" />
      </div>
    </div>
  </aside>
</template>


<script setup lang="ts">
import { socialLinks } from '~/utils/datas/socialMedia.data';
import { headerNav } from '~/utils/datas/headerNav.data';

const router = useRouter();

const isOpen = ref(false);

const drawer = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (newValue) => {
  if (process.client) {
    if (newValue) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }
  }
}, { immediate: true });

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>
