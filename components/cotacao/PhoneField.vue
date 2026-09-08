<template>
  <div>
    <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </label>
    <div class="tooltip">
      <input
        :id="id"
        type="tel"
        inputmode="numeric"
        autocomplete="tel"
        placeholder="(00) 00000-0000"
        :value="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        :class="
          clsx(
            'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme1 sm:text-sm sm:leading-6 outline-none',
            errorMessage && 'ring-red-500 focus:ring-red-500'
          )
        "
      />
      <transition name="fade" mode="out-in">
        <span v-if="errorMessage" class="tooltiptext">{{ errorMessage }}</span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import "~/assets/css/tooltip.css"
import { useField } from 'vee-validate'
import clsx from 'clsx'
import { maskPhoneBR } from '~/utils/mask/phone'

interface Props {
  id: string
  name: string
  label: string
  modelValue: string
  rules?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

// Mantém o campo integrado à validação do vee-validate (usado para o
// meta.valid agregado do Form pai) sem depender do componente <Field>,
// já que aqui precisamos interceptar o @input para aplicar a máscara.
const { errorMessage, handleChange, handleBlur } = useField(props.name, props.rules ?? '', {
  initialValue: props.modelValue,
})

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  const masked = maskPhoneBR(target.value)
  emit('update:modelValue', masked)
  handleChange(masked)
}
</script>
