import * as yup from 'yup'

/**
 * Formata um número de telefone para o formato (XX)XXXXX-XXXX celular ou (XX)XXXX-XXXX fixo.
 *
 * @param telefone O número de telefone a ser formatado.
 * @returns O número de telefone formatado.
 */
export function formatarTelefone (telefone: string): string {
  // Remove tudo o que não é dígito
  let numeros: string = telefone.replace(/\D/g, '')

  // Verifica se o número tem mais de 2 dígitos
  if (numeros.length > 2) {
    // Insere os parênteses nos dois primeiros dígitos
    numeros = '(' + numeros.substring(0, 2) + ')' + numeros.substring(2)
  }

  // Verifica se o número tem mais de 6 dígitos
  if (numeros.length > 6) {
    // Insere o hífen antes dos últimos 4 dígitos
    numeros = numeros.substring(0, numeros.length - 4) + '-' + numeros.substring(numeros.length - 4)
  }

  return numeros
}

// Esquema de validação
export const schema = yup.object().shape({
  nome: yup.string().matches(/^[a-zA-ZÀ-ú\s]+$/, 'Nome inválido'),
  email: yup.string().email('E-mail inválido'),
  cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  telefone: yup.string().matches(/^\(\d{2}\)\d{4,5}-\d{4}$/, 'Telefone inválido'),
  status: yup.string().required('Status é obrigatório')
})
