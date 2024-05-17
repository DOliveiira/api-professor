// index.js

const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

// Endpoint POST para adicionar um novo professor
app.post('/professores', async (req, res) => {
  const { nome, cpf, dataNascimento, logradouro, bairro, cidade, estado, cep, email } = req.body;
  try {
    const novoProfessor = await prisma.professor.create({
      data: {
        nome,
        cpf,
        dataNascimento: new Date(dataNascimento),
        logradouro,
        bairro,
        cidade,
        estado,
        cep,
        email
      }
    });
    res.status(201).json(novoProfessor);
  } catch (error) {
    console.error('Erro ao adicionar professor:', error);
    res.status(500).send('Erro ao adicionar professor.');
  }
});

// Endpoint PUT para atualizar um professor existente
app.put('/professores/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, dataNascimento, logradouro, bairro, cidade, estado, cep, email } = req.body;
  try {
    const professorAtualizado = await prisma.professor.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        cpf,
        dataNascimento: new Date(dataNascimento),
        logradouro,
        bairro,
        cidade,
        estado,
        cep,
        email
      }
    });
    res.status(200).json(professorAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    res.status(500).send('Erro ao atualizar professor.');
  }
});

// Endpoint DELETE para excluir um professor existente
app.delete('/professores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.professor.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).send('Professor excluído com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir professor:', error);
    res.status(500).send('Erro ao excluir professor.');
  }
});

// Endpoint GET para obter todos os professores
app.get('/professores', async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.status(200).json(professores);
  } catch (error) {
    console.error('Erro ao obter professores:', error);
    res.status(500).send('Erro ao obter professores.');
  }
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
