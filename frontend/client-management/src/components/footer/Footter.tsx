import React, { useEffect, useState } from 'react'
import { getAllClients } from '../../services/api'
import './Footer.css'

const Footer: React.FC = () => {
  const [numberOfClients, setNumberOfClients] = useState(0)

  useEffect(() => {
    const fetchClients = async (): Promise<void> => {
      try {
        const clients = await getAllClients()
        setNumberOfClients(clients.length)
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }
    fetchClients().catch(() => {})
  }, [])

  return (
    <footer className="footer">
      Exibindo {numberOfClients} clientes
    </footer>
  )
}

export default Footer
