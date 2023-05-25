import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlunoEditModal } from './AlunoEditModal';
import { AlunoDeleteModal } from './AlunoDeleteModal';
import api from '../services/api';

export const AlunoTable = ({ onEdit }) => {
  const { data, refetch } = useQuery('alunos', async () => {
    const response = await api.get('/aluno');
    console.log(response.data);  // Adicione esta linha

    return response.data;
  });

  const [alunoToEdit, setAlunoToEdit] = useState(null);
  const [alunoToDelete, setAlunoToDelete] = useState(null);

  const handleEdit = (aluno) => {
    console.log(aluno);
    setAlunoToEdit(aluno);
  };

  const handleDelete = (aluno) => {
    console.log(aluno);
    setAlunoToDelete(aluno);
  };

  const handleCloseEdit = () => {
    setAlunoToEdit(null);
  };

  const handleCloseDelete = () => {
    setAlunoToDelete(null);
  };

  const handleSuccess = () => {
    refetch();
  };

  return (
    <div>
      <h2>Alunos Cadastrados</h2>  

      <p>Total de alunos: {data?.length}</p>          

      <Table  bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Bimestre</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((aluno, index) => (
            <tr key={aluno.id}>
              <td>{index + 1}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.matricula}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.bimestre}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(aluno)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                {' '}
                <Button variant="danger" onClick={() => handleDelete(aluno)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  
      {alunoToEdit && (
        <AlunoEditModal
          show={true}
          aluno={alunoToEdit}
          handleClose={handleCloseEdit}
          onSuccess={handleSuccess}
        />
      )}
  
      {alunoToDelete && (
        <AlunoDeleteModal
          show={true}
          aluno={alunoToDelete}
          handleClose={handleCloseDelete}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
