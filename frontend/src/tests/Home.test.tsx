import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import api from './mock/apiMock'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../App'
import '@testing-library/jest-dom'
import clientesMock from './mock/clientesMock'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

let mock: MockAdapter

// Antes de cada teste, vamos criar uma nova instância do MockAdapter
beforeEach(() => {
  mock = new MockAdapter(axios)
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

// Após cada teste, vamos limpar as definições do MockAdapter
afterEach(() => {
  mock.reset()
  jest.restoreAllMocks()
})

beforeAll(() => {
  window.scrollTo = jest.fn()
})

describe('Teste da Pagina Home "/"', () => {
  test('Testa se a rota "/" renderiza os elementos iniciais da pagina', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Renderize o componente App
    await act(async () => {
      render(<App />)
    })

    // Testa se o texto no inicio da pagina é renderizado
    expect(screen.getByRole('heading', { name: /painel de clientes/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /listagem de usuários/i })).toBeInTheDocument()
    expect(screen.getByText(/escolha um cliente para visualizar os detalhes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /novo cliente/i })).toBeInTheDocument()
  })

  test('Testa se ao clicar no logotipo é redirecionado a pagina da UOL', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Renderize o componente App
    await act(async () => {
      render(<App />)
    })

    // Substitui a funcionalidade de redirecionamento do navegador
    const originalWindowLocation = window.location
    delete (window as any).location;
    (window as any).location = { ...originalWindowLocation, href: '' }

    // Encontre e clique no logotipo da UOL
    const uolLogo = screen.getByRole('img', { name: /uol logo/i })
    await act(async () => { fireEvent.click(uolLogo) })

    // Verifique se ocorreu o redirecionamento
    expect(window.location.href).toBe('https://www.uol.com.br')

    // Restaure window.location para o seu estado original
    window.location = originalWindowLocation
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
    await act(async () => {
      render(<App />)
    })

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
    await act(async () => {
      render(<App />)
    })

    // Aguarde até que todos os elementos da lista sejam renderizados
    await waitFor(() => {
      // Verifique se o texto "Exibindo X clientes" é renderizado
      expect(screen.getByText(`Exibindo ${clientesMock.length} clientes`)).toBeInTheDocument()
    })
  })

  test('Clicar no botão "Novo cliente" redireciona para a rota /clientes', async () => {
    // Renderize o componente dentro de um MemoryRouter

    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      )
    })

    // Encontre e clique no botão "Novo Cliente"
    const novoClienteButton = screen.getByText('Novo cliente')
    await act(async () => { fireEvent.click(novoClienteButton) })

    // Verifique se a rota foi alterada para /clientes
    expect(window.location.pathname).toBe('/clientes')

    // Testando o botão voltar
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /voltar/i })) })

    // Verifique se a rota foi alterada para "/"
    expect(window.location.pathname).toBe('/')
  })

  test('Clicar no botão "Editar" redireciona para a rota /clientes/id', async () => {
    // Simulando a resposta para a requisição GET para /clientes
    mock.onGet('/clientes').reply(200, clientesMock)

    // Realizando a requisição GET para /clientes utilizando a instância da API mockada
    await api.get('/clientes')

    // Configurando o histórico do MemoryRouter
    // const history = createMemoryHistory()

    // Renderize o componente dentro de um MemoryRouter
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )
    })

    // Aguarde a renderização do componente que exibe os clientes
    await waitFor(() => screen.getByText('123.456.789-00'))

    // Encontre e clique no botão "Editar" se ele existir
    const editarButtons = screen.getAllByText('Editar')
    if (editarButtons.length > 1) {
      await act(async () => { fireEvent.click(editarButtons[1]) }) // Clique no botão "Editar" do segundo cliente
    }

    // Extrai o id do caminho atual
    const currentPath = window.location.pathname
    const id = currentPath.split('/')[2]

    // Verifique se a rota foi alterada para /clientes/id, onde id é o id do cliente
    expect(currentPath).toBe(`/clientes/${id}`)
  })
})
