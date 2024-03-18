import axios, { type AxiosInstance } from 'axios'
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

export default api
