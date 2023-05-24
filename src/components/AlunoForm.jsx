// src/components/AlunoForm.js

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { createAluno, updateAluno } from '../services/api';

export const AlunoForm = ({ onSuccess, alunoToEdit }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (alunoToEdit) {
      setValue('nome', alunoToEdit.nome);
      setValue('matricula', alunoToEdit.matricula);
      setValue('curso', alunoToEdit.curso);
      setValue('bimestre', alunoToEdit.bimestre);
    }
  }, [alunoToEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      if (alunoToEdit) {
        await updateAluno(alunoToEdit.id, data);
      } else {
        await createAluno(data);
      }
      onSuccess();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control {...register('nome')} placeholder="Nome" />
      </Form.Group>
      
      <Form.Group controlId="formMatricula">
        <Form.Label>Matrícula</Form.Label>
        <Form.Control {...register('matricula')} placeholder="Matrícula" />
      </Form.Group>

      <Form.Group controlId="formCurso">
        <Form.Label>Curso</Form.Label>
        <Form.Control {...register('curso')} placeholder="Curso" />
      </Form.Group>

      <Form.Group controlId="formBimestre">
        <Form.Label>Bimestre</Form.Label>
        <Form.Control {...register('bimestre')} placeholder="Bimestre" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
};
