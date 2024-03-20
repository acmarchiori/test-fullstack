import React from 'react'
import { useHistory } from 'react-router-dom'
import './UserListSection.css'

/**
 * Componente responsável por exibir a seção de listagem de usuários.
 *
 * Esta seção contém um título "Listagem de usuários" e uma breve descrição,
 * além de um botão para adicionar um novo cliente.
 */
const UserListSection: React.FC = () => {
  const history = useHistory()

  return (
    <div className="user-list-section">
      <div className='text-container'>
        <h2>Listagem de usuários</h2>
        <p>Escolha um cliente para visualizar os detalhes</p>
      </div>
      <div>
        <button className='button' type="button" onClick={() => { history.push('/clientes') }}>Novo cliente</button>
      </div>
    </div>
  )
}

export default UserListSection
