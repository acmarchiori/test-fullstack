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

// Adicione lógica para requisição de cliente pelo id
mock.onGet(/\/clientes\/\d+/).reply(config => {
  const urlParts = config.url?.split('/');
  const id = urlParts ? parseInt(urlParts[urlParts.length - 1], 10) : -1;
  const cliente = clientesMock.find(c => c.id === id);
  return cliente ? [200, cliente] : [404, {}]; // Aqui estamos retornando 404 caso o cliente não seja encontrado
});

export default api
