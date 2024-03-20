import axios, { type AxiosResponse } from 'axios'

/**
 * Interface que define a estrutura de um cliente.
 */
interface Client {
  id?: number // Opcional: ID do cliente
  nome: string // Nome do cliente
  email: string // E-mail do cliente
  cpf: string // CPF do cliente
  telefone: string // Número de telefone do cliente
  status: string // Status do cliente
}

/**
 * Configuração da instância do axios para realizar requisições à API.
 */
const apiLocal = axios.create({
  baseURL: 'http://localhost:8080/'
})

const apiProd = axios.create({
  baseURL: 'https://client-management-api.fly.dev/'
})

/**
 * Função para obter todos os clientes da API.
 *
 * @returns Uma Promise que resolve com um array de clientes.
 */
export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response: AxiosResponse<Client[]> = await apiLocal.get('/clientes')
    return response.data
  } catch (error) {
    console.error('Error fetching clients from local server:', error)
    try {
      const response: AxiosResponse<Client[]> = await apiProd.get('/clientes')
      return response.data
    } catch (error) {
      console.error('Error fetching clients from production server:', error)
      throw error
    }
  }
}

/**
 * Função para criar um novo cliente na API.
 *
 * @param clientData Os dados do cliente a serem enviados para a API.
 * @returns Uma Promise que resolve quando a requisição é bem-sucedida.
 */
export const createClient = async (clientData: Client): Promise<void> => {
  try {
    await apiLocal.post('/clientes', clientData)
  } catch (error) {
    console.error('Error creating client on local server:', error)
    try {
      await apiProd.post('/clientes', clientData)
    } catch (error) {
      console.error('Error creating client on production server:', error)
      throw error
    }
  }
}

/**
 * Função para atualizar um cliente existente na API.
 *
 * @param clientId O ID do cliente a ser atualizado.
 * @param clientData Os novos dados do cliente.
 * @returns Uma Promise que resolve quando a requisição é bem-sucedida.
 */
export const updateClient = async (clientId: number, clientData: Client): Promise<void> => {
  try {
    await apiLocal.put(`/clientes/${clientId}`, clientData)
  } catch (error) {
    console.error('Error updating client on local server:', error)
    try {
      await apiProd.put(`/clientes/${clientId}`, clientData)
    } catch (error) {
      console.error('Error updating client on production server:', error)
      throw error
    }
  }
}

/**
 * Função para obter um cliente específico da API pelo seu ID.
 *
 * @param clientId O ID do cliente a ser obtido.
 * @returns Uma Promise que resolve com os dados do cliente.
 */
export const getClientById = async (clientId: number): Promise<Client> => {
  try {
    const response: AxiosResponse<Client> = await apiLocal.get(`/clientes/${clientId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching client by ID from local server:', error)
    try {
      const response: AxiosResponse<Client> = await apiProd.get(`/clientes/${clientId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching client by ID from production server:', error)
      throw error
    }
  }
}
