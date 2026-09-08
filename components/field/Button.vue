<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="
      clsx(
        'btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
        isInactive && 'btn-disabled',
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
import { useIsFormDirty, useIsFormValid } from "vee-validate";

import clsx from 'clsx';

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
  
// So consulta o formulario quando o botao de fato representa o envio dele.
// Padrao mantem o comportamento historico (apenas type="submit"); passe
// :bind-to-form="false" para desacoplar um submit, ou true para vincular outro tipo.
const bindsToForm = computed(() => props.bindToForm ?? props.type === 'submit');

const isInactive = computed(() => {
  if (!bindsToForm.value) return false;
  return !isDirty.value || !isValid.value;
});

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  outlined?: boolean;
  danger?: boolean;
  disabled?: boolean;
  /** Inativa o botao enquanto o formulario nao estiver preenchido e valido. Padrao: so para type="submit". */
  bindToForm?: boolean;
}
const props = defineProps<ButtonProps>();
</script>

<style scoped></style>