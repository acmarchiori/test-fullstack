import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllClients } from '../../services/api'
import './UserList.css'

interface Client {
  id?: number
  nome: string
  email: string
  cpf: string
  telefone: string
  status: string
}

/**
 * Componente responsável por exibir a lista de clientes.
 */
const UserList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    /**
     * Função assíncrona para buscar os clientes da API e atualizar o estado.
     */
    const fetchClients = async (): Promise<void> => {
      try {
        const response = await getAllClients()
        setClients(response)
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }

    // Chamada da função de busca de clientes ao montar o componente
    fetchClients().catch(() => {})
  }, [])

  /**
   * Função para determinar a classe de cor com base no status do cliente.
   * @param status - O status do cliente.
   * @returns A classe CSS correspondente à cor do status.
   */
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Ativo':
        return 'active'
      case 'Inativo':
        return 'inactive'
      case 'Aguardando ativação':
        return 'awaiting-activation'
      case 'Desativado':
        return 'disabled'
      default:
        return ''
    }
  }

  return (
    <div>
      {/* Mapeia cada cliente para exibir suas informações */}
      {clients.map(client => (
        <div key={client.id} className='client-info'>
          <div className='first-column'>
            <span className='strong' data-testid="cliente">{client.nome}</span>
            <br />
            <span>{client.email}</span>
          </div>
          <div className='second-column'>
            <span className='strong'>{client.cpf}</span>
            <br />
            <span>{client.telefone}</span>
          </div>
          <div className="third-column">
            {/* Exibe um ponto de status colorido com base no status do cliente */}
            <span className={`status-dot ${getStatusColor(client.status)}`}></span>
            <span>{client.status}</span>
          </div>
          <div className='fourth-column'>
            {/* Link para a página de edição do cliente */}
            <Link to={`/clientes/${client.id}`} className="edit-button">Editar</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserList
