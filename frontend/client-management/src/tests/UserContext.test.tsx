import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { ClientProvider, useClientContext } from '../context/UserContext';

describe('UserContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <ClientProvider>{children}</ClientProvider>;


  test('updateClientList atualiza a lista de clientes corretamente', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ClientProvider>{children}</ClientProvider>;
    const { result } = renderHook(() => useClientContext(), { wrapper });

    // Atualizar a lista de clientes
    act(() => {
      result.current.updateClientList([{ id: 1, name: 'Teste', email: 'teste@teste.com', cpf: '12345678901', telefone: '123456789', status: 'Ativo' }]);
    });

    // Verificar se a lista de clientes foi atualizada corretamente
    expect(result.current.clients.length).toBe(1);
    expect(result.current.clients[0].name).toBe('Teste');
  });

  test('useClientContext retorna o contexto de cliente corretamente', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useClientContext();
      return null;
    };
    
    const wrapper = ({ children }: { children: React.ReactNode }) => <ClientProvider>{children}</ClientProvider>;
    render(<TestComponent />, { wrapper });

    // Verificar se useClientContext retornou o contexto corretamente
    expect(contextValue).toEqual({ clients: [], updateClientList: expect.any(Function) });
  });
});

// Componente de teste dummy para usar o hook useClientContext
const DummyComponent = () => {
  const contextValue = useClientContext();
  return <div>{JSON.stringify(contextValue)}</div>;
};
