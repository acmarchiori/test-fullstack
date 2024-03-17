import React, { useEffect, useState } from 'react'
import { getAllClients } from '../../services/api'
import './Footer.css'

/**
 * Componente responsável por exibir o rodapé da página, incluindo o número total de clientes.
 * O número de clientes é obtido através da API externa.
 */
const Footer: React.FC = () => {
  // Estado para armazenar o número total de clientes
  const [numberOfClients, setNumberOfClients] = useState(0)

  // Efeito utilizado para buscar o número total de clientes ao carregar o componente
  useEffect(() => {
    const fetchClients = async (): Promise<void> => {
      try {
        // Chama a função para obter todos os clientes
        const clients = await getAllClients()
        // Define o número total de clientes no estado
        setNumberOfClients(clients.length)
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }
    // Invoca a função de busca de clientes
    fetchClients().catch(() => {})
  }, [])

  // Renderiza o rodapé exibindo o número total de clientes
  return (
    <footer className="footer">
      Exibindo {numberOfClients} clientes
    </footer>
  )
}

export default Footer
