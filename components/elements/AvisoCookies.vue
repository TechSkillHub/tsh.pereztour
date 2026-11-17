<template>
  <Transition name="aviso">
    <section
      v-if="aberto"
      ref="raiz"
      aria-labelledby="aviso-cookies-titulo"
      class="fixed inset-x-0 bottom-0 z-[60] p-3 md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:p-0"
    >
      <div class="rounded-xl border border-[#e8ebf7]/20 bg-theme1 p-5 text-offWhite shadow-2xl">
        <h2 id="aviso-cookies-titulo" class="text-sm font-bold">Cookies de medição</h2>
        <p class="mt-2 text-sm leading-relaxed text-offWhite">
          Usamos cookies do Google Analytics para saber quantas pessoas visitam o site e quais botões
          ajudam mais. O que você digita na cotação nunca entra nessa medição.
          <NuxtLink to="/privacidade" class="font-semibold text-theme2 underline underline-offset-2">
            Política de privacidade
          </NuxtLink>
        </p>
        <p v-if="reaberto && escolha" class="mt-3 text-xs font-semibold text-theme3">
          Neste navegador, a medição está {{ escolha === 'recusado' ? 'desligada' : 'ligada' }}.
        </p>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <button
            ref="primeiroBotao"
            type="button"
            class="rounded-md border-2 border-[#e8ebf7]/70 py-2.5 text-sm font-bold text-offWhite transition-colors hover:bg-[#e8ebf7]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme2"
            @click="recusar"
          >
            Não quero ser medido
          </button>
          <button
            type="button"
            class="rounded-md border-2 border-theme2 bg-theme2 py-2.5 text-sm font-bold text-theme1 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offWhite"
            @click="aceitar"
          >
            {{ reaberto && escolha === 'recusado' ? 'Pode medir' : 'Ok' }}
          </button>
        </div>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import { useConsentimento } from '~/composables/useConsentimento'

/**
 * Aviso de cookies. Monta so no navegador (ClientOnly no app.vue), pequeno e
 * sem imagem, para nao virar o LCP nem atrasar a primeira pintura.
 *
 * "Aceitar" e "Recusar" do mesmo tamanho, lado a lado: recusar tem que ser
 * tao facil quanto aceitar.
 *
 * Enquanto aberto no celular, publica a propria altura em
 * --aviso-cookies-altura para o botao flutuante do WhatsApp subir e nao ficar
 * escondido atras do aviso.
 */
const { aberto, pronto, reaberto, escolha, aceitar, recusar } = useConsentimento()

const raiz = ref<HTMLElement | null>(null)
const primeiroBotao = ref<HTMLButtonElement | null>(null)
let observador: ResizeObserver | null = null

const celular = () => window.matchMedia('(max-width: 767px)').matches

function publicarAltura() {
  const altura = aberto.value && raiz.value && celular() ? raiz.value.offsetHeight : 0
  document.documentElement.style.setProperty('--aviso-cookies-altura', `${altura}px`)
}

watch(
  aberto,
  async (estaAberto) => {
    await nextTick()
    observador?.disconnect()
    if (estaAberto && raiz.value) {
      observador = new ResizeObserver(publicarAltura)
      observador.observe(raiz.value)
      // Reaberto pelo rodape: leva o foco para o aviso, quem usa teclado precisa achar.
      if (reaberto.value) primeiroBotao.value?.focus()
    }
    publicarAltura()
  },
  { flush: 'post' },
)

onMounted(() => {
  pronto.value = true
})

onBeforeUnmount(() => observador?.disconnect())
</script>

<style scoped>
.aviso-enter-active,
.aviso-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .aviso-enter-active,
  .aviso-leave-active {
    transition: none;
  }
}
</style>
