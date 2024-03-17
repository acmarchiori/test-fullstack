import React from 'react';
import { ClientProvider } from './context/UserContext'; // Importando ClientProvider
import Routes from './routes/Routes';

const App: React.FC = () => { // Definindo o tipo do componente como React.FC
  return (
    <ClientProvider> {/* Usando ClientProvider */}
      <Routes />
    </ClientProvider>
  );
};

export default App;