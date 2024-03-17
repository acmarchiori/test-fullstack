import React from 'react'
import userIcon from '../../images/user.png'
import './UserPanel.css'

/**
 * Componente responsável por exibir o painel de informações do usuário.
 *
 * Este componente exibe um painel contendo o título "Painel de Clientes" e
 * uma imagem de ícone de usuário.
 */
const UserPanel: React.FC = () => {
  return (
    <div className="user-info-container">
      <div className="user-info">
        <img src={userIcon} alt="User Icon" className="user-icon" />
        <h1 className="user-info-title">Painel de Clientes</h1>
      </div>
      <hr className="divider" />
    </div>
  )
}

export default UserPanel
