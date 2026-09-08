<template>
  <Teleport to="body">
    <Transition name="cotacao-fade">
      <div v-if="cotacao.show" class="fixed inset-0 z-[70]">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="attemptClose" aria-hidden="true" />

        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cotacao-titulo"
          tabindex="-1"
          class="relative z-10 mx-auto flex h-[100dvh] w-full flex-col overflow-hidden bg-offWhite text-theme1 outline-none md:my-8 md:h-auto md:max-h-[85vh] md:max-w-2xl md:rounded-2xl md:shadow-2xl"
        >
          <!-- Cabeçalho fixo: progresso + fechar -->
          <div class="shrink-0 border-b border-theme1/10 px-6 pb-4 pt-5">
            <div class="flex items-center justify-between gap-4">
              <h2 id="cotacao-titulo" class="text-sm font-semibold uppercase tracking-wide text-theme2">
                Etapa {{ cotacao.step }} de {{ cotacao.totalSteps }}
              </h2>
              <button
                type="button"
                class="rounded-full p-1 text-theme1/60 transition-colors hover:text-theme1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme2"
                aria-label="Fechar formulário de cotação"
                @click="attemptClose"
              >
                <IconsClose size="24" />
              </button>
            </div>

            <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-theme1/10">
              <div
                class="h-full rounded-full bg-theme2 transition-[width] duration-300 ease-out"
                :style="{ width: progressPercent + '%' }"
              />
            </div>

            <div class="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-theme1/5 px-3 py-2 text-sm">
              <span class="font-semibold">{{ tripTypeLabel }}</span>
              <button
                type="button"
                class="font-semibold text-theme2 underline underline-offset-2 hover:brightness-110"
                @click="showTypeSwitcher = !showTypeSwitcher"
              >
                Trocar tipo de viagem
              </button>
            </div>

            <div v-if="showTypeSwitcher" class="mt-2">
              <CotacaoTripTypeOptions compact :selected="cotacao.tripType" @select="handleChangeType" />
            </div>

            <div class="mt-3 text-center">
              <a
                :href="duvidaLink"
                target="_blank"
                rel="noopener"
                class="text-xs text-theme1/60 underline hover:text-theme2"
              >
                Tirar uma dúvida pelo WhatsApp
              </a>
            </div>
          </div>

          <!-- Confirmação de descarte, substitui o conteúdo da etapa -->
          <div
            v-if="confirmingDiscard"
            class="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-8 text-center"
          >
            <p class="text-lg font-semibold">Você já começou a preencher.</p>
            <p class="text-sm text-theme1/70">
              Se sair agora, seus dados ficam salvos neste navegador e você pode retomar de onde parou.
            </p>
            <div class="flex w-full flex-col gap-3 sm:flex-row">
              <button type="button" class="btn btn-outlined !w-auto flex-1 !py-3 !text-base" @click="confirmDiscardClose">
                Fechar mesmo assim
              </button>
              <button type="button" class="btn !w-auto flex-1 !py-3 !text-base" @click="confirmingDiscard = false">
                Continuar preenchendo
              </button>
            </div>
          </div>

          <component v-else :is="currentStepComponent" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { registrarRegras } from '~/utils/cotacao/validation'

// registra as regras do vee-validate quando a modal e carregada
registrarRegras()
import { useCotacaoStore } from '~/stores/cotacao.store'
import { buildDuvidaWhatsAppLink, type TripType } from '~/utils/datas/whatsapp.data'
import CotacaoStepContato from '~/components/cotacao/StepContato.vue'
import CotacaoStepOrigemDestino from '~/components/cotacao/StepOrigemDestino.vue'
import CotacaoStepDatas from '~/components/cotacao/StepDatas.vue'
import CotacaoStepHospedagem from '~/components/cotacao/StepHospedagem.vue'
import CotacaoStepRevisao from '~/components/cotacao/StepRevisao.vue'

const cotacao = useCotacaoStore()
const route = useRoute()
const router = useRouter()

const dialogRef = ref<HTMLElement | null>(null)
const showTypeSwitcher = ref(false)
const confirmingDiscard = ref(false)
const duvidaLink = buildDuvidaWhatsAppLink()

const stepComponents = [
  CotacaoStepContato,
  CotacaoStepOrigemDestino,
  CotacaoStepDatas,
  CotacaoStepHospedagem,
  CotacaoStepRevisao,
]

const currentStepComponent = computed(() => stepComponents[cotacao.step - 1])
const progressPercent = computed(() => (cotacao.step / cotacao.totalSteps) * 100)

const tripTypeLabels: Record<TripType, string> = {
  pacote: 'Pacote completo (voo + hotel)',
  passagem: 'Só passagem aérea',
  hospedagem: 'Só hospedagem',
}
const tripTypeLabel = computed(() => tripTypeLabels[cotacao.tripType])

function handleChangeType(type: TripType) {
  cotacao.changeTripType(type)
  showTypeSwitcher.value = false
}

function attemptClose() {
  if (cotacao.hasProgress) {
    confirmingDiscard.value = true
  } else {
    doClose()
  }
}

function confirmDiscardClose() {
  confirmingDiscard.value = false
  doClose()
}

function doClose() {
  cotacao.closeModal()
  showTypeSwitcher.value = false
}

// --- Deep-link por query string (?cotacao=1 | pacote | passagem | hospedagem) ---
function mapQueryToType(raw: unknown): TripType {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (value === 'passagem' || value === 'hospedagem' || value === 'pacote') return value
  return 'pacote'
}

function openFromQueryIfNeeded() {
  if (route.query.cotacao && !cotacao.show) {
    cotacao.openModal(mapQueryToType(route.query.cotacao))
  }
}

watch(
  () => cotacao.show,
  (isOpen) => {
    if (isOpen) {
      router.replace({ query: { ...route.query, cotacao: cotacao.tripType } })
    } else {
      const { cotacao: _drop, ...rest } = route.query
      router.replace({ query: rest })
    }
  }
)

watch(
  () => cotacao.tripType,
  (type) => {
    if (cotacao.show) {
      router.replace({ query: { ...route.query, cotacao: type } })
    }
  }
)

// --- Foco: trap + devolução ao elemento que abriu a modal ---
let previouslyFocusedEl: HTMLElement | null = null

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

async function focusFirstField() {
  await nextTick()
  const root = dialogRef.value
  if (!root) return
  const focusable = root.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
  ;(focusable ?? root).focus()
}

watch(
  () => cotacao.show,
  (isOpen) => {
    if (isOpen) {
      previouslyFocusedEl = document.activeElement as HTMLElement
      focusFirstField()
    } else {
      previouslyFocusedEl?.focus?.()
      previouslyFocusedEl = null
    }
  }
)

// Ao trocar de etapa, o foco também volta para o primeiro campo da nova etapa.
watch(
  () => cotacao.step,
  () => {
    if (cotacao.show) focusFirstField()
  }
)

function handleDocumentKeydown(e: KeyboardEvent) {
  if (!cotacao.show) return

  if (e.key === 'Escape') {
    if (confirmingDiscard.value) {
      confirmingDiscard.value = false
    } else {
      attemptClose()
    }
    return
  }

  if (e.key === 'Tab') {
    const root = dialogRef.value
    if (!root) return
    const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null
    )
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleDocumentKeydown)
  openFromQueryIfNeeded()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleDocumentKeydown)
})

// Defesa extra: se o componente for desmontado com a modal aberta, destrava o scroll.
onBeforeUnmount(() => {
  if (cotacao.show && process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.cotacao-fade-enter-active,
.cotacao-fade-leave-active {
  transition: opacity 0.2s ease;
}
.cotacao-fade-enter-from,
.cotacao-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .cotacao-fade-enter-active,
  .cotacao-fade-leave-active {
    transition: none;
  }
}
</style>
