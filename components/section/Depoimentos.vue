<template>
  <div class="py-24 text-offWhite">
    <div class="container">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="title-sections mb-4" v-html="depoimentos.title"></h2>
        <p class="subtitle-sections mb-6" v-html="depoimentos.subtitle"></p>
        <p class="text-sections font-light" v-html="depoimentos.text"></p>
      </div>

      <div class="cards-scroll md:grid-cols-3 mt-16">
        <figure
          v-for="(item, i) in depoimentos.items"
          :key="item.user"
          class="cards-scroll-item flex h-full flex-col overflow-hidden rounded-2xl bg-offWhite text-theme1"
        >
          <img
            :src="fotos[item.imagem]"
            :alt="`Cliente da Perez Tour em ${item.destination}`"
            loading="lazy"
            width="460"
            height="345"
            class="h-52 w-full object-cover"
            :class="item.foco"
          />

          <figcaption class="flex flex-1 flex-col px-7 pb-7 pt-6">
            <span aria-hidden="true" class="block font-brand text-4xl leading-none text-theme2">&ldquo;</span>

            <blockquote
              :ref="(el) => (textos[i] = el)"
              class="mt-1 font-light leading-relaxed"
              :class="aberto[item.user] ? '' : 'line-clamp-3 min-h-[4.9rem]'"
            >{{ item.text }}</blockquote>

            <!-- Altura reservada em TODOS os cards para que os tres fiquem iguais,
                 mesmo onde o botao nao aparece. -->
            <div class="mt-2 flex h-6 items-start justify-end">
              <button
                v-if="cortado[item.user]"
                type="button"
                class="text-sm font-semibold uppercase tracking-wide text-theme2Dark underline underline-offset-2"
                @click="alternar(item.user)"
              >
                {{ aberto[item.user] ? 'Leia menos' : 'Leia mais' }}
              </button>
            </div>

            <div class="mt-auto border-t border-grayTheme pt-4">
              <p class="font-semibold uppercase text-theme2Dark">{{ item.user }}</p>
              <p class="text-sm text-darkTheme">{{ item.destination }}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentCustom } from '~/composables/useCustomContent'
import gramado from '@/assets/images/depoimentos/gramado.webp'
import maceio from '@/assets/images/depoimentos/maceio.webp'
import jalapao from '@/assets/images/depoimentos/jalapao.webp'

const content = await useContentCustom()
const depoimentos = content.depoimentos

// o Vite so resolve o hash do asset para caminhos importados
const fotos = { gramado, maceio, jalapao }

const textos = ref([])
const aberto = reactive({})
const cortado = reactive({})

// Quem mostra o "Leia mais" e quem REALMENTE transbordou as 3 linhas, medido
// no DOM. Contar caracteres nao serve: o card do mobile e mais estreito, entao
// um texto que cabe em 3 linhas no desktop pode ser cortado no celular (era o
// caso do Wesley e do Rubens, que ficavam cortados e sem botao).
function medir() {
  depoimentos.items.forEach((item, i) => {
    const el = textos.value[i]
    // enquanto esta aberto nao ha clamp, entao a medida nao vale
    if (!el || aberto[item.user]) return
    cortado[item.user] = el.scrollHeight > el.clientHeight + 1
  })
}

function alternar(user) {
  aberto[user] = !aberto[user]
  if (!aberto[user]) nextTick(medir)
}

let observador
onMounted(async () => {
  await nextTick()
  medir()
  // a largura do card muda com o viewport: remede quando isso acontecer
  observador = new ResizeObserver(medir)
  textos.value.forEach((el) => el && observador.observe(el))
})
onBeforeUnmount(() => observador?.disconnect())
</script>

<style scoped>
#depoimentos {
  @apply bg-rightVector bg-right-bottom bg-no-repeat bg-contain lg:bg-auto;
}
</style>
