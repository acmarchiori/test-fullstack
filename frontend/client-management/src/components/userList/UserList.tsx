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

const UserList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const fetchClients = async (): Promise<void> => {
      try {
        const response = await getAllClients()
        setClients(response)
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }
    fetchClients().catch(() => {})
  }, [])

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
      {clients.map(client => (
        <div key={client.id} className='client-info'>
            <div className='first-column'>
              <span className='strong'>{client.nome}</span>
              <br />
              <span>{client.email}</span>
            </div>
            <div className='second-column'>
            <span className='strong'>{client.cpf}</span>
              <br />
              <span>{client.telefone}</span>
            </div>
            <div className="third-column">
              <span className={`status-dot ${getStatusColor(client.status)}`}></span>
              <span>{client.status}</span>
            </div>
            <div className='fourth-column'>
            <Link to={`/clientes/${client.id}`} className="edit-button">Editar</Link>
            </div>
          </div>
      ))}
    </div>
  )
}

export default UserList
