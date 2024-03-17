import React from 'react';
import uolLogo from '../../images/uol-logo.png';
import './Header.css';

const Header: React.FC = () => {
    const handleLogoClick = () => {
    // Lógica para redirecionar para a página da UOL
    window.location.href = 'https://www.uol.com.br';
    };

    return (
    <header className="header">
        <div className="header__logo-container">
            <img src={ uolLogo } className="header__logo" alt="UOL Logo" onClick={handleLogoClick}/>
        </div>
    </header>
    );
};

export default Header;
