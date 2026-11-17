<template>
  <Transition name="aviso">
    <section
      v-if="aberto"
      ref="raiz"
      aria-label="Aviso de cookies"
      class="fixed inset-x-0 bottom-0 z-[60] p-3 md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:p-0"
    >
      <div class="rounded-xl border border-[#e8ebf7]/20 bg-theme1 p-5 text-offWhite shadow-2xl">
        <p class="text-sm leading-relaxed">
          Usamos cookies para melhorar a sua experiência e entender como o site é usado. Saiba mais na
          nossa
          <NuxtLink to="/privacidade" class="font-semibold text-theme2 underline underline-offset-2">
            Política de privacidade</NuxtLink>.
        </p>
        <p v-if="reaberto && escolha" class="mt-3 text-xs font-semibold text-theme3">
          Neste navegador, a medição está {{ recusou ? 'desligada' : 'ligada' }}.
        </p>
        <div class="mt-4 flex items-center justify-between gap-4">
          <button
            ref="link"
            type="button"
            class="text-xs text-grayTheme underline underline-offset-2 hover:text-offWhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme2"
            @click="recusar"
          >
            {{ recusou ? 'Manter desligada' : 'Não quero ser medido' }}
          </button>
          <button
            ref="botao"
            type="button"
            class="shrink-0 rounded-md bg-theme2 px-8 py-2.5 text-sm font-bold text-theme1 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offWhite"
            @click="aceitar"
          >
            {{ recusou ? 'Voltar a permitir' : 'Ok' }}
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
 * Modelo (decisao do Felipe, 17/11/2026): o aviso so INFORMA. "Ok" fecha; a
 * recusa e um link discreto, mas sempre presente, e continua no rodape
 * ("Preferencias de cookies"). Texto generico de proposito.
 *
 * Enquanto aberto no celular, publica a propria altura em
 * --aviso-cookies-altura para o botao flutuante do WhatsApp subir e nao ficar
 * escondido atras do aviso.
 */
const { aberto, pronto, reaberto, escolha, aceitar, recusar } = useConsentimento()

// Reaberto pelo rodape por quem ja tinha recusado: os botoes passam a falar
// em voltar a permitir, nao em "Ok".
const recusou = computed(() => reaberto.value && escolha.value === 'recusado')

const raiz = ref<HTMLElement | null>(null)
const botao = ref<HTMLButtonElement | null>(null)
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
      if (reaberto.value) botao.value?.focus()
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
