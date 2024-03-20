import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import api from './mock/apiMock'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../App'
import '@testing-library/jest-dom'
import clientesMock from './mock/clientesMock'

describe('Teste da Pagina de Edição/Criação de Clientes "/clientes" e "/clientes/id"', () => {
  let mock: MockAdapter

  // Antes de cada teste, vamos criar uma nova instância do MockAdapter
  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  // Após cada teste, vamos limpar as definições do MockAdapter
  afterEach(() => {
    mock.reset()
  })
  test('Testa se a rota "/clientes" renderiza os elementos da pagina', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Renderize o componente dentro de um MemoryRouter
    render(<App />)
    
    //Acessando a pagina de criação de clientes
    fireEvent.click(screen.getByRole('button', { name: /novo cliente/i }))

    // Verifique se a rota foi alterada para "/clientes"
    expect(window.location.pathname).toBe('/clientes')

    // Testa se os elementos da pagina são renderizados
    expect(screen.getByRole('heading', { name: /painel de clientes/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /novo usuário/i })).toBeInTheDocument()
    expect(screen.getByText(/informe os campos a seguir para criar um novo usuário:/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/e\-mail/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/cpf/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()

    // Votando para a pagina inicial
    fireEvent.click(screen.getByRole('button', { name: /voltar/i }))

    // Verifique se a rota foi alterada para "/"
    expect(window.location.pathname).toBe('/')
  })
  test('Testa se a rota "/clientes/id" renderiza os elementos da pagina', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Renderize o componente dentro de um MemoryRouter
    render(<App />)

    // Aguarde a renderização do componente que exibe os clientes
    await waitFor(() => screen.getByText('123.456.789-00'));

    // Encontre e clique no botão "Editar" se ele existir
    const editarButtons = screen.getAllByText('Editar');
    if (editarButtons.length > 1) {
      fireEvent.click(editarButtons[1]); // Clique no botão "Editar" do segundo cliente
    }

    // Extrai o id do caminho atual
    const currentPath = window.location.pathname;
    const id: number = Number(currentPath.split('/')[2]);

    // Simulando a resposta para a requisição GET para /clientes/id
    mock.onGet(`/clientes/${id}`).reply(200, clientesMock[id]);

    // Realizando a requisição GET para /clientes/id utilizando a instância da API mockada
    await api.get(`/clientes/${id}}`);

    // Aguarde até que carregando saia da tela
    await waitFor(() => expect(screen.queryByText(/carregando\.\.\./i)).toBeNull());

    // Aguarde a renderização do componente que exibe os clientes
    await waitFor(() => expect(screen.getByTestId('cpf')).toHaveValue('123.456.789-01'));
    
    // Testa se os elementos da pagina são renderizados
    expect(screen.getByRole('heading', { name: /painel de clientes/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /editar usuário/i })).toBeInTheDocument()
    expect(screen.getByText(/informe os campos a seguir para editar um usuário:/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(/john doe/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/e\-mail/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(/john_doe2@test\.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/cpf/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(/123\.456\.789\-01/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(/\(11\)9998\-8743/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByDisplayValue(/ativo/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()

    // Votando para a pagina inicial
    fireEvent.click(screen.getByRole('button', { name: /voltar/i }))

    // Verifique se a rota foi alterada para "/"
    expect(window.location.pathname).toBe('/')
  })
})
describe('Testa as validações da Pagina de Edição/Criação de Clientes "/clientes"', () => {
  let mock: MockAdapter

  // Antes de cada teste, vamos criar uma nova instância do MockAdapter
  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  // Após cada teste, vamos limpar as definições do MockAdapter
  afterEach(() => {
    mock.reset()
  })
  test('Testa se é possível criar um novo cliente com inputs/select vazios', () => {
    // Renderize o componente dentro de um MemoryRouter
    render(<App />)
    
    //Acessando a pagina de criação de clientes
    fireEvent.click(screen.getByRole('button', { name: /novo cliente/i }))
    
    // Verifique se a rota foi alterada para "/clientes"
    expect(window.location.pathname).toBe('/clientes')

    // Testa se os elementos da pagina são requeridos
    expect(screen.getByPlaceholderText(/nome/i)).toBeRequired()
    expect(screen.getByPlaceholderText(/e\-mail/i)).toBeRequired()
    expect(screen.getByPlaceholderText(/cpf/i)).toBeRequired()
    expect(screen.getByPlaceholderText(/telefone/i)).toBeRequired()
    expect(screen.getByRole('combobox')).toBeRequired()

    // Votando para a pagina inicial
    fireEvent.click(screen.getByRole('button', { name: /voltar/i }))

    // Verifique se a rota foi alterada para "/"
    expect(window.location.pathname).toBe('/')
  })
  test('Testa as validações dos inputs', async () => {
    // Renderize o componente dentro de um MemoryRouter
    render(<App />)
    
    //Acessando a pagina de criação de clientes
    fireEvent.click(screen.getByRole('button', { name: /novo cliente/i }))
    
    // Verifique se a rota foi alterada para "/clientes"
    expect(window.location.pathname).toBe('/clientes')

    // Captura o input pelo placeholder
    const nomeInput = screen.getByPlaceholderText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/e\-mail/i);
    const cpfInput = screen.getByPlaceholderText(/cpf/i);
    const telefoneInput = screen.getByPlaceholderText(/telefone/i);
    const select = screen.getByRole('combobox');

    // Simula preenchimento do form
    fireEvent.change(nomeInput, { target: { value: 1 } });
    fireEvent.change(emailInput, { target: { value: 'abc@def' } });
    fireEvent.change(cpfInput, { target: { value: '123' } });
    fireEvent.change(telefoneInput, { target: { value: '123' } });
    fireEvent.change(select, { target: { value: 'Ativo' } });

    // Clica no botão de criar
    fireEvent.click(screen.getByRole('button', { name: /criar/i }))
    
    // Aguarde a renderização do componente que exibe os clientes
    await waitFor(() => {screen.getByText(/nome inválido/i)});

    expect(screen.getByText(/nome inválido/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('E-mail')).toHaveAttribute('type', 'email');
    expect(screen.getByText(/cpf inválido/i)).toBeInTheDocument()
    expect(screen.getByText(/telefone inválido/i)).toBeInTheDocument()

    // Votando para a pagina inicial
    fireEvent.click(screen.getByRole('button', { name: /voltar/i }))

    // Verifique se a rota foi alterada para "/"
    expect(window.location.pathname).toBe('/')
  })
  test('Requisição GET para /clientes/:id retorna status 400 para cliente inexistente', async () => {
    // Mock da resposta para a requisição GET para /clientes/id
    const clientId = 123; // ID de um cliente inexistente
    mock.onGet(`/clientes/${clientId}`).reply(400);
  
    // Realizando a requisição GET para /clientes/:id utilizando a instância da API
    try {
      const response = await api.get(`/clientes/${clientId}`);
      // O teste falhará se a requisição for bem-sucedida
      expect(response.status).not.toBe(400);
    } catch (error: any) { // Use type assertion to specify the type of 'error'
      // Verificando se a requisição falhou com o status 404
      expect(error.response.status).toBe(404);
    }
  });
})