<template>
  <Form v-slot="{ meta, errors }" class="contents" @submit="cotacao.nextStep()">
    <div class="flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6">
      <FieldInput
        id="cotacao-nome"
        name="nome"
        label="Primeiro nome"
        rules="required"
        v-model="cotacao.contato.nome"
        :has-error="!!errors.nome"
      />

      <div>
        <CotacaoPhoneField
          id="cotacao-whatsapp"
          name="whatsapp"
          label="WhatsApp"
          rules="required|whatsapp"
          v-model="cotacao.contato.whatsapp"
        />
        <p class="mt-2 text-xs text-grayTheme">
          É por esse WhatsApp que a Perez Tour vai falar com você sobre a sua cotação.
        </p>
      </div>

      <div>
        <label class="flex cursor-pointer items-start gap-3 text-sm text-darkTheme">
          <Field
            type="checkbox"
            name="autoriza"
            :value="true"
            :unchecked-value="false"
            rules="required"
            v-model="cotacao.contato.autoriza"
            class="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-theme1 focus:ring-theme1"
          />
          <span>
            Autorizo a Perez Tour a entrar em contato comigo pelo WhatsApp informado para tratar
            desta solicitação de cotação.
          </span>
        </label>
        <transition name="fade" mode="out-in">
          <ErrorMessage name="autoriza" class="mt-1 block text-xs text-red-500" />
        </transition>
      </div>

      <!-- Honeypot: invisível para pessoas, visível para bots de formulário -->
      <div class="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label for="cotacao-empresa">Não preencha este campo</label>
        <input
          id="cotacao-empresa"
          name="empresa"
          type="text"
          tabindex="-1"
          autocomplete="off"
          v-model="cotacao.contato.honeypot"
        />
      </div>
    </div>

    <CotacaoStepFooter :can-advance="meta.valid" :show-back="false" />
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useCotacaoStore } from '~/stores/cotacao.store'

const cotacao = useCotacaoStore()
</script>
