import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllClients, createClient, updateClient, getClientById } from '../services/api';
import clientData from './mock/clientesMock';

// Crie uma instância do axios-mock-adapter passando a instância do Axios
const mock = new MockAdapter(axios);

describe('Funções da API', () => {
  afterEach(() => {
    mock.reset();
  });

  test('getAllClients deve lidar com erro quando a requisição à API falha', async () => {
    mock.onGet('/clientes').reply(500); // Simulando erro no servidor
    await expect(getAllClients()).rejects.toThrow();
  });

  test('createClient deve lidar com erro quando a requisição à API falha', async () => {
    mock.onPost('/clientes').reply(500); // Simulando erro no servidor
    await expect(createClient(clientData)).rejects.toThrow();
  });

  test('updateClient deve lidar com erro quando a requisição à API falha', async () => {
    const clientId = 1;
    mock.onPut(`/clientes/${clientId}`).reply(500); // Simulando erro no servidor
    await expect(updateClient(clientId, clientData)).rejects.toThrow();
  });

  test('getClientById deve lidar com erro quando a requisição à API falha', async () => {
    const clientId = 1;
    mock.onGet(`/clientes/${clientId}`).reply(500); // Simulando erro no servidor
    await expect(getClientById(clientId)).rejects.toThrow();
  });
});
