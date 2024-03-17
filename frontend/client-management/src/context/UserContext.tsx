import React, { createContext, useState, useContext } from 'react'

// Definição do tipo para um cliente
interface Client {
  id?: number
  name: string
  email: string
  cpf: string
  telefone: string
  status: string
}

// Definição do tipo para o contexto de cliente
interface ClientContextType {
  clients: Client[]
  updateClientList: (newClients: Client[]) => void
}

// Inicialização do contexto
const ClientContext = createContext<ClientContextType | undefined>(undefined)

/**
 * Provedor de contexto para gerenciar informações de clientes.
 *
 * Este provedor fornece um contexto que pode ser utilizado para acessar e modificar
 * a lista de clientes na aplicação.
 */
const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([])

  // Função para atualizar a lista de clientes
  const updateClientList = (newClients: Client[]): void => {
    setClients(newClients)
  }

  return (
    <ClientContext.Provider value={{ clients, updateClientList }}>
      {children}
    </ClientContext.Provider>
  )
}

/**
 * Hook personalizado para acessar o contexto de cliente.
 *
 * Este hook retorna o contexto de cliente, permitindo que os componentes
 * da aplicação acessem e atualizem as informações de clientes.
 */
const useClientContext = (): ClientContextType => {
  const context = useContext(ClientContext)
  if (context === null || context === undefined) {
    throw new Error('useClientContext deve ser usado dentro de um ClientProvider')
  }
  return context
}

export { ClientProvider, useClientContext }
