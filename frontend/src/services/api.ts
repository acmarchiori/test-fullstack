import axios, { type AxiosResponse } from 'axios'
import { type Client, type ApiURL, LOCAL_API_URL } from './types'

// Configuração da instância do axios para realizar requisições à API
const apiLocal = axios.create({ baseURL: LOCAL_API_URL })

/**
 * Função genérica para realizar uma requisição à API.
 *
 * @param method Método da requisição (GET, POST, PUT, DELETE).
 * @param url URL da requisição.
 * @param data Os dados a serem enviados para a API (opcional).
 * @returns Uma Promise que resolve com os dados da resposta.
 */
async function requestToAPI<T> (method: 'get' | 'post' | 'put' | 'delete', url: ApiURL, data?: T): Promise<T> {
  try {
    let response: AxiosResponse<T>

    switch (method) {
      case 'get':
        response = await apiLocal.get<T>(url)
        break
      case 'post':
        response = await apiLocal.post<T>(url, data)
        break
      case 'put':
        response = await apiLocal.put<T>(url, data)
        break
      case 'delete':
        response = await apiLocal.delete<T>(url)
        break
      default:
        throw new Error('Invalid HTTP method')
    }

    return response.data
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} request to local server (${url}):`, error)
    throw error
  }
}

/**
 * Função para obter todos os clientes da API.
 *
 * @returns Uma Promise que resolve com um array de clientes.
 */
export const getAllClients = async (): Promise<Client[]> => {
  return await requestToAPI<Client[]>('get', '/clientes')
}

/**
 * Função para criar um novo cliente na API.
 *
 * @param clientData Os dados do cliente a serem enviados para a API.
 * @returns Uma Promise que resolve quando a requisição é bem-sucedida.
 */
export const createClient = async (clientData: Client): Promise<void> => {
  await requestToAPI<Client>('post', '/clientes', clientData)
}

/**
 * Função para atualizar um cliente existente na API.
 *
 * @param clientId O ID do cliente a ser atualizado.
 * @param clientData Os novos dados do cliente.
 * @returns Uma Promise que resolve quando a requisição é bem-sucedida.
 */
export const updateClient = async (clientId: number, clientData: Client): Promise<void> => {
  await requestToAPI<Client>('put', `/clientes/${clientId}`, clientData)
}

/**
 * Função para obter um cliente específico da API pelo seu ID.
 *
 * @param clientId O ID do cliente a ser obtido.
 * @returns Uma Promise que resolve com os dados do cliente.
 */
export const getClientById = async (clientId: number): Promise<Client> => {
  return await requestToAPI<Client>('get', `/clientes/${clientId}`)
}
