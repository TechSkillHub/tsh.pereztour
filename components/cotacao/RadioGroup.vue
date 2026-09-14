<template>
  <fieldset>
    <legend class="block text-sm font-medium leading-6 text-gray-900 mb-2">
      {{ legend }}
    </legend>
    <div class="flex flex-wrap gap-2">
      <label
        v-for="option in options"
        :key="option.value"
        class="cursor-pointer select-none"
      >
        <Field
          type="radio"
          :name="name"
          :value="option.value"
          :rules="rules"
          v-model="value"
          class="peer sr-only"
        />
        <span
          :class="clsx(
            'block rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-theme2',
            value === option.value
              ? 'border-theme2 bg-theme2 text-offWhite'
              : 'border-gray-300 text-darkTheme hover:border-theme2/60'
          )"
        >
          {{ option.label }}
        </span>
      </label>
    </div>
    <p v-if="microcopy" class="mt-2 text-xs text-grayTheme">{{ microcopy }}</p>
    <transition name="fade" mode="out-in">
      <ErrorMessage :name="name" class="block mt-1 text-xs text-red-700" />
    </transition>
  </fieldset>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import clsx from 'clsx'

interface Option {
  value: string
  label: string
}

interface Props {
  legend: string
  name: string
  options: Option[]
  modelValue: string
  rules?: string
  microcopy?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v),
})
</script>
