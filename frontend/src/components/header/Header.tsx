import React from 'react'
import uolLogo from '../../images/uol-logo.png'
import './Header.css'

/**
 * Componente responsável por exibir o cabeçalho da página com o logotipo da UOL.
 * Ao clicar no logotipo, o usuário será redirecionado para a página principal da UOL.
 */
const Header: React.FC = (): JSX.Element => {
  /**
   * Função de clique no logotipo da UOL.
   * Redireciona o usuário para a página principal da UOL.
   */
  const handleLogoClick = (): void => {
    // Lógica para redirecionar para a página da UOL
    window.location.href = 'https://www.uol.com.br'
  }

  return (
    <header className="header">
      {/* Contêiner do logotipo */}
      <div className="header__logo-container">
        {/* Logotipo da UOL */}
        <img src={uolLogo} className="header__logo" alt="UOL Logo" onClick={handleLogoClick} />
      </div>
    </header>
  )
}

export default Header
