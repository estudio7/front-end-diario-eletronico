// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-aluno.vercel.app',
});

export const getAlunos = async () => {
  const response = await api.get('/aluno');
  return response.data;
};

export const createAluno = async (data) => {
  await api.post('/aluno', data);
};

export const updateAluno = async (id, data) => {
  await api.put(`/aluno/${id}`, data);
};

export const deleteAluno = async (id) => {
  await api.delete(`/aluno/${id}`);
};

export default api;
