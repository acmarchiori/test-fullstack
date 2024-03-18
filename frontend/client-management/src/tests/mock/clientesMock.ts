interface Cliente {
  id: number
  nome: string
  email: string
  cpf: string
  telefone: string
  status: 'Ativo' | 'Inativo' | 'Aguardando ativação' | 'Desativado'
}

const clientesMock: Cliente[] = [
  {
    id: 1,
    nome: 'John Doe',
    email: 'john_doe1@test.com',
    cpf: '123.456.789-00',
    telefone: '(11)9998-8745',
    status: 'Ativo'
  },
  {
    id: 2,
    nome: 'John Doe',
    email: 'john_doe2@test.com',
    cpf: '123.456.789-01',
    telefone: '(11)9998-8743',
    status: 'Inativo'
  },
  {
    id: 3,
    nome: 'John Doe',
    email: 'john_doe3@test.com',
    cpf: '123.456.789-02',
    telefone: '(11)9998-8742',
    status: 'Aguardando ativação'
  },
  {
    id: 4,
    nome: 'John Doe',
    email: 'john_doe4@test.com',
    cpf: '123.456.789-03',
    telefone: '(11)9998-8741',
    status: 'Desativado'
  }
]

export default clientesMock
