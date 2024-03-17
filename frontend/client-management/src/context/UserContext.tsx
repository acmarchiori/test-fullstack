import React, { createContext, useState, useContext } from 'react';

// Definindo o tipo para um cliente
type Client = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  status: string;
};

// Definindo o tipo para o contexto de cliente
type ClientContextType = {
  clients: Client[];
  updateClientList: (newClients: Client[]) => void;
};

// Inicializando o contexto
const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Criando o provedor de contexto
const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clients, setClients] = useState<Client[]>([]);

    const updateClientList = (newClients: Client[]) => {
        setClients(newClients);
    };

    return (
        <ClientContext.Provider value={{ clients, updateClientList }}>
            {children}
        </ClientContext.Provider>
    );
};

// Criando um hook personalizado para acessar o contexto de cliente
const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext deve ser usado dentro de um ClientProvider');
  }
  return context;
};

export { ClientProvider, useClientContext };
