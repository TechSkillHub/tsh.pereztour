<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="
      clsx(
        'btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
        inactive && 'btn-disabled',
        disabled && 'btn-disabled',
        fullWidth && 'w-full',
        outlined && 'btn-outlined',
        danger && '',
      )
    "
  >
    <slot v-if="!disabled" />
    <IconsLoading v-else />
  </button>
</template>

<script setup lang="ts">
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  outlined?: boolean;
  danger?: boolean;
  disabled?: boolean;
  /**
   * Aparencia de inativo. Antes o componente consultava o estado do
   * formulario via vee-validate, o que arrastava a biblioteca (39KB) para o
   * bundle inicial de TODAS as paginas — sendo que so a modal de cotacao usa
   * formulario. Agora quem esta dentro do form passa o estado.
   */
  inactive?: boolean;
}
defineProps<ButtonProps>();
</script>

<style scoped></style>
