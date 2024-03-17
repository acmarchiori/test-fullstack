import axios, { type AxiosResponse } from 'axios'

interface Client {
  id?: number
  nome: string
  email: string
  cpf: string
  telefone: string
  status: string
}

const api = axios.create({
  baseURL: 'http://localhost:8080' // URL base da sua API
})

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response: AxiosResponse<Client[]> = await api.get('/clientes')
    return response.data
  } catch (error) {
    console.error('Error fetching clients:', error)
    throw error // Você pode optar por lançar o erro novamente ou tratar de outra forma
  }
}

export const createClient = async (clientData: any): Promise<void> => {
  try {
    await api.post('/clientes', clientData)
  } catch (error) {
    console.error('Error creating client:', error)
    throw error
  }
}

export const updateClient = async (clientId: number, clientData: any): Promise<void> => {
  try {
    await api.put(`/clientes/${clientId}`, clientData)
  } catch (error) {
    console.error('Error updating client:', error)
    throw error
  }
}

export const getClientById = async (clientId: number): Promise<Client> => {
  try {
    const response: AxiosResponse<Client> = await api.get(`/clientes/${clientId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching client by ID:', error)
    throw error
  }
}
