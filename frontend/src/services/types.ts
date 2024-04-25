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

export const LOCAL_API_URL: ApiURL = 'http://localhost:8080'
export const PROD_API_URL: ApiURL = 'https://client-management-api.fly.dev'
