import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL base da sua API
});

export const getAllClients = () => {
  return api.get('/clientes');
};

export const createClient = (clientData: any) => {
  return api.post('/clientes', clientData);
};

export const updateClient = (clientId: number, clientData: any) => {
  return api.put(`/clientes/${clientId}`, clientData);
};

export const getClientById = (clientId: number) => {
  return api.get(`/clientes/${clientId}`);
};