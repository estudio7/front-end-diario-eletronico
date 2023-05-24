// src/components/AlunoEditModal.jsx

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import api from '../services/api';

export const AlunoEditModal = ({ aluno, show, handleClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation(async (data) => {
    const response = await api.put(`/aluno/${aluno.id}`, data);
    return response.data;
  }, {
    onSuccess: () => {
      onSuccess();
      handleClose();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" {...register("nome", { required: true })} />
            {errors.nome && <span>Este campo é obrigatório</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Matricula</Form.Label>
            <Form.Control type="text" placeholder="Matricula" {...register("matricula", { required: true })} />
            {errors.matricula && <span>Este campo é obrigatório</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Curso</Form.Label>
            <Form.Control type="text" placeholder="Curso" {...register("curso", { required: true })} />
            {errors.curso && <span>Este campo é obrigatório</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bimestre</Form.Label>
            <Form.Control type="text" placeholder="Bimestre" {...register("bimestre", { required: true })} />
            {errors.bimestre && <span>Este campo é obrigatório</span>}
          </Form.Group>

          <Button variant="primary" type="submit">Salvar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
