// src/App.jsx

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AlunoForm } from './components/AlunoForm';
import { AlunoTable } from './components/AlunoTable';

const queryClient = new QueryClient();

export const App = () => {
  const [alunoToEdit, setAlunoToEdit] = useState(null);

  const handleEdit = (aluno) => {
    setAlunoToEdit(aluno);
  };

  const handleSuccess = () => {
    setAlunoToEdit(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <h1>Gerenciamento de Alunos</h1>
        <AlunoForm onSuccess={handleSuccess} alunoToEdit={alunoToEdit} />
        <AlunoTable onEdit={handleEdit} />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
