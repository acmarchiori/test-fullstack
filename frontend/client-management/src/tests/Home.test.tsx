import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import api from './mocks/apiMock'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../App'
import '@testing-library/jest-dom'
import clientesMock from './mocks/clientesMock'
import { MemoryRouter } from 'react-router-dom'

describe('Teste da Pagina Home "/"', () => {
  let mock: MockAdapter

  // Antes de cada teste, vamos criar uma nova instância do MockAdapter
  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  // Após cada teste, vamos limpar as definições do MockAdapter
  afterEach(() => {
    mock.reset()
  })
  test('Testa se a rota "/" Renderiza os elementos iniciais da pagina', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Renderize o componente App
    render(<App />)

    // Testa se o texto no inicio da pagina é renderizado
    expect(screen.getByRole('heading', { name: /painel de clientes/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /listagem de usuários/i })).toBeInTheDocument()
    expect(screen.getByText(/escolha um cliente para visualizar os detalhes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /novo cliente/i })).toBeInTheDocument()
  })
  test('Requisição GET para /clientes retorna dados mockados', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API
    const response = await api.get('/clientes')

    // Verificando se a resposta contém os dados mockados
    expect(response.status).toBe(200)
    expect(response.data).toEqual(clientesMock)
  })
  test('Testa se uma lista de clientes mockada é renderizada', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Renderize o componente App
    render(<App />)

    // Aguarde até que todos os elementos da lista sejam renderizados
    await waitFor(() => {
      clientesMock.forEach(cliente => {
        // Selecione todos os elementos com o texto "John Doe" e pegue o elemento pelo índice
        const nomeElement = screen.getAllByText('John Doe')[cliente.id - 1]
        expect(nomeElement).toBeInTheDocument()

        // Verifique outros detalhes do cliente, se necessário
        expect(screen.getByText(cliente.email)).toBeInTheDocument()
        expect(screen.getByText(cliente.cpf)).toBeInTheDocument()
        expect(screen.getByText(cliente.telefone)).toBeInTheDocument()
        expect(screen.getByText(cliente.status)).toBeInTheDocument()
      })
    })
  })
  test('Testa se o texto "Exibindo X clientes" é renderizado corretamente', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Renderize o componente App
    render(<App />)

    // Aguarde até que todos os elementos da lista sejam renderizados
    await waitFor(() => {
      // Verifique se o texto "Exibindo X clientes" é renderizado
      expect(screen.getByText(`Exibindo ${clientesMock.length} clientes`)).toBeInTheDocument()
    })
  })
  test('Clicar no botão "Novo cliente" redireciona para a rota /clientes', () => {
    // Renderize o componente dentro de um MemoryRouter
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // Encontre e clique no botão "Novo Cliente"
    const novoClienteButton = screen.getByText('Novo cliente')
    fireEvent.click(novoClienteButton)

    // Verifique se a rota foi alterada para /clientes
    expect(window.location.pathname).toBe('/clientes')
  })

  test('Clicar no botão "Editar" redireciona para a rota /clientes', () => {
    // Renderize o componente dentro de um MemoryRouter
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // Encontre e clique no botão "Editar" se ele existir
    const editarButton = screen.queryByText('Editar')
    // Verifique se o botão "Editar existe"
    if (editarButton) {
      fireEvent.click(editarButton)
    }

    // Verifique se a rota foi alterada para /clientes
    expect(window.location.pathname).toBe('/clientes')
  })
})
