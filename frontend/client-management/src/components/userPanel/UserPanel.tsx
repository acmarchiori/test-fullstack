import React from 'react'
import userIcon from '../../images/user.png' // Importe o logotipo do usuário aqui
import './UserPanel.css'

const UserPanel: React.FC = () => {
  return (
        <div className="user-info-container">
            <div className="user-info">
            <img src={ userIcon } alt="User Icon" className="user-icon" />
            <h1 className="user-info-title">Painel de Clientes</h1>
        </div>
        <hr className="divider" />
        </div>
  )
}

export default UserPanel
