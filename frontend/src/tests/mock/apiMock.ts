import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import clientesMock from './clientesMock'

// Crie uma instância do axios-mock-adapter passando a instância do Axios
const mock = new MockAdapter(axios)

// Simule uma requisição GET para a rota /clientes e responda com dados mockados
mock.onGet('/clientes').reply(200, clientesMock)

// Defina a baseURL para o servidor mockado
const baseURL = 'http://localhost:8080'

// Crie uma nova instância do Axios com a baseURL do servidor mockado
const api: AxiosInstance = axios.create({
  baseURL
})

// Adicione lógica para requisição de cliente pelo id
mock.onGet(/\/clientes\/\d+/).reply(config => {
  const urlParts = config.url?.split('/')
  const id = (urlParts != null) ? parseInt(urlParts[urlParts.length - 1], 10) : -1
  const cliente = clientesMock.find(c => c.id === id)
  return (cliente != null) ? [200, cliente] : [404, {}] // Aqui estamos retornando 404 caso o cliente não seja encontrado
})

// Adicione lógica para simular uma requisição PUT para atualizar um cliente pelo id
mock.onPut(/\/clientes\/\d+/).reply((config: AxiosRequestConfig<any>) => {
  const urlParts = config.url?.split('/')
  const id = (urlParts != null) ? parseInt(urlParts[urlParts.length - 1], 10) : -1
  const data = typeof config.data === 'string' ? JSON.parse(config.data) : {} // Verifica se config.data é uma string antes de fazer o parse
  // Atualize o cliente correspondente na lista de clientes mockados (clientesMock)
  const clienteIndex = clientesMock.findIndex(c => c.id === id)
  if (clienteIndex !== -1) {
    clientesMock[clienteIndex] = { ...clientesMock[clienteIndex], ...data }
    return [200, clientesMock[clienteIndex]] // Retorne o cliente atualizado com status 200
  } else {
    return [404, {}] // Caso o cliente não seja encontrado, retorne status 404
  }
})

// Adicione lógica para simular uma requisição POST para criar um novo cliente
let falhaNaCriacao = false

mock.onPost('/clientes').reply(config => {
  if (falhaNaCriacao) {
    falhaNaCriacao = false
    return [400, { error: 'Erro ao criar cliente' }]
  } else {
    const data = JSON.parse(config.data as string)
    return [201, { message: 'Cliente criado com sucesso', cliente: data }]
  }
})

// Use this function to simulate a failure in the next POST request
export function simularFalhaNaCriacao (): void {
  falhaNaCriacao = true
}

export default api
