import React from 'react';
import { useHistory } from 'react-router-dom';
import './UserListSection.css';

const UserListSection: React.FC = () => {
  const history = useHistory();

  return (
    <div className="user-list-section">
      <div className='text-container'>
      <h2>Listagem de usuários</h2>
      <p>Escolha um cliente para visualizar os detalhes</p>
      </div>
      <div>
        <button type="button" onClick={() => history.push('/clientes')}>Novo cliente</button>
      </div>
    </div>
  );
};
      
      export default UserListSection;
      