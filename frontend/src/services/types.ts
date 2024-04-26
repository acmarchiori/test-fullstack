export interface Client {
  id?: number
  nome: string
  email: string
  cpf: string
  telefone: string
  status: string
}

export enum ClientStatus {
  Status = 'Status',
  Ativo = 'Ativo',
  Inativo = 'Inativo',
  AguardandoAtivacao = 'Aguardando ativação',
  Desativado = 'Desativado'
}

export type ApiURL = string

// Verifica se a variável de ambiente REACT_APP_API_URL está definida
// Se estiver definida, utiliza o valor dela
// Se não estiver definida, utiliza um valor padrão
export const LOCAL_API_URL: ApiURL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080'
export const PROD_API_URL: ApiURL = 'https://client-management-api.fly.dev'
