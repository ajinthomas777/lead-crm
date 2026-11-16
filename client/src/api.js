import axios from 'axios';

const api = axios.create({ baseURL: '/api/leads' });

export const getLeads = (search = '') =>
  api.get('/', { params: { search } }).then((res) => res.data);
export const createLead = (data) => api.post('/', data).then((res) => res.data);
export const updateLead = (id, data) => api.put(`/${id}`, data).then((res) => res.data);
export const deleteLead = (id) => api.delete(`/${id}`).then((res) => res.data);
