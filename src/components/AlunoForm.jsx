// src/components/AlunoForm.js

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
      <Row className='py-3'>
        <Col xs={12} md={2}>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control {...register('nome')} placeholder="Nome" />
          </Form.Group>
        </Col>
      
        <Col xs={12} md={2}>
          <Form.Group controlId="formMatricula">
            <Form.Label>Matrícula</Form.Label>
            <Form.Control {...register('matricula')} placeholder="Matrícula" />
          </Form.Group>
        </Col>

        <Col xs={12} md={3}>
          <Form.Group controlId="formCurso">
            <Form.Label>Curso</Form.Label>
            <Form.Control {...register('curso')} as="select" style={{appearance: 'auto'}}>
              <option value="">Selecione o Curso...</option>
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
              <option value="Base de Dados">Base de Dados</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={12} md={2}>
          <Form.Group controlId="formBimestre">
            <Form.Label>Bimestre</Form.Label>
            <Form.Control {...register('bimestre')} placeholder="Bimestre" />
          </Form.Group>
        </Col>

        <Col xs={12} md={3} className="d-flex align-items-end">
          <Button variant="primary" type="submit" style={{width: '100%'}}>
            Salvar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
