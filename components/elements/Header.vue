<template>
  <nav class="fixed w-full p-6 text-header h-header flex transition-all ease-in-out duration-700 z-40" :class="scrollY > 100 ? '!bg-header' : ''">
    <div class="flex items-center justify-between container mx-auto w-full">

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
      <div class="hidden md:block bg-gradient text-white p-6 rounded-full">
        <ul class="flex gap-2 text-sm font-sans items-center">
          <li v-for="(item, index) in headerNav" :key="index" class="">
            <NuxtLink :to="item.link" class="py-3 px-5 text-nowrap rounded-full" :class="router.currentRoute.value.fullPath == item.link ? 'bg-gradient-active' : ''">
              {{ item.title }}
            </NuxtLink>
          </li>          
        </ul>
      </div>      
    </div>
  </nav>

  <!-- Drawer Menu -->
  <aside class="p-5 pt-header transform -top-header left-0 w-full bg-darkBg text-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30" :class="isOpen ? 'translate-y-header' : '-translate-y-full'">
    <ul class="divide-y font-sans">
      <li v-for="(item, index) in headerNav" :key="index">
        <NuxtLink :to="item.link" @click="isOpen = false" class="my-4 inline-block">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>

    <div class="follow">
      <p class="italic font-sans text-sm mt-4">Nos siga nas redes sociais:</p>
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

const scrollY = ref(0);

const updateScrollY = () => {
  scrollY.value = window.scrollY;
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
  window.addEventListener('scroll', updateScrollY);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollY);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
.bg-gradient {
  background: rgb(23,29,34);
  background: linear-gradient(145deg, rgba(23,29,34,1) 0%, rgba(33,42,50,1) 100%);
}
.bg-gradient-active {
  background: rgb(116,150,181);
  background: linear-gradient(145deg, rgba(116,150,181,1) 0%, rgba(59,91,133,1) 100%);
}
</style>
