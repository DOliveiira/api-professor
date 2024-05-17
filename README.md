Criar tabela no MySql

CREATE DATABASE IF NOT EXISTS db_professor;

USE db_professor;

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(18) NOT NULL,
  data_nascimento DATE NOT NULL,
  logradouro VARCHAR(100),
  bairro VARCHAR(45),
  cidade VARCHAR(45),
  estado VARCHAR(45),
  cep VARCHAR(45),
  email VARCHAR(250) NOT NULL
);
