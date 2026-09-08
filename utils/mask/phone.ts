/**
 * Aplica a máscara (00) 00000-0000 progressivamente enquanto o usuário digita.
 * Aceita também números fixos (8 dígitos após o DDD).
 */
export function maskPhoneBR(value: string): string {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11)

  if (!digits) return ''

  const ddd = digits.slice(0, 2)
  const rest = digits.slice(2)

  if (digits.length <= 2) {
    return `(${ddd}`
  }

  if (rest.length <= 5) {
    return `(${ddd}) ${rest}`
  }

  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`
}
