<template>
  <div>
    <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </label>
    <Field
      v-model="value"
      :name="name"
      :type="type"
      :id="id"
      :disabled="disabled"
      :min="min"
      :max="max"
      :rules="rules"
      :aria-invalid="hasError ? 'true' : undefined"
      :aria-describedby="hasError ? `${id}-erro` : undefined"
      v-on="ehData ? eventosData : {}"
      :class="
        clsx(
          'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme1 sm:text-sm sm:leading-6 outline-none',
          ehData && 'cursor-pointer',
          disabled && 'opacity-70 cursor-default',
          hasError && 'ring-red-700 focus:ring-red-700'
        )
      "
    />
    <!-- A mensagem fica ABAIXO do campo, no mesmo padrao dos grupos de opcao.
         Antes era um balao que nunca aparecia: buscava o erro pelo "id" do
         campo, mas o vee-validate guarda pelo "name". -->
    <ErrorMessage :id="`${id}-erro`" :name="name" as="p" class="mt-1 block text-xs text-red-700" />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import clsx from 'clsx';

interface InputProps {
  label: string;
  id: string;
  modelValue: string | number;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  /** repassados ao input (ex.: limite de datas em type="date") */
  min?: string;
  max?: string;
  hasError: boolean;
  /** string ("required|email") ou objeto ({ required: true, depoisDe: [...] }) */
  rules: string | Record<string, unknown>;
}

const props = defineProps<InputProps>();
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

// Campo de data: nada de digitar. Clicar em qualquer ponto abre o calendario.
// Tab e Esc continuam livres (navegacao por teclado e fechar a modal);
// Enter, Espaco e seta para baixo abrem o calendario.
const ehData = computed(() => props.type === 'date');

function abrirCalendario(e: Event) {
  const el = e.currentTarget as HTMLInputElement;
  try {
    el.showPicker?.();
  } catch {
    // navegador sem showPicker ou calendario ja aberto: fica o comportamento nativo
  }
}

function bloquearDigitacao(e: KeyboardEvent) {
  if (e.key === 'Tab' || e.key === 'Escape') return;
  e.preventDefault();
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') abrirCalendario(e);
}

const eventosData = {
  click: abrirCalendario,
  keydown: bloquearDigitacao,
  paste: (e: Event) => e.preventDefault(),
  drop: (e: Event) => e.preventDefault(),
};
</script>
