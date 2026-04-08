-- Remover tabelas se existirem (para o comando setup:reset funcionar)
DROP TABLE IF EXISTS multas CASCADE;
DROP TABLE IF EXISTS reservas CASCADE;
DROP TABLE IF EXISTS emprestimos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS livros CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS editoras CASCADE;
DROP TABLE IF EXISTS autores CASCADE;

CREATE TABLE autores (
    id SERIAL PRIMARY KEY, 
    nome VARCHAR(100), 
    data_nascimento DATE, 
    nacionalidade VARCHAR(50)
);

CREATE TABLE editoras (
    id SERIAL PRIMARY KEY, 
    nome VARCHAR(100), 
    endereco VARCHAR(255)
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY, 
    nome VARCHAR(50), 
    descricao TEXT
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY, 
    titulo VARCHAR(255), 
    ano_publicacao INT, 
    genero VARCHAR(50), 
    autor_id INT REFERENCES autores(id), 
    editora_id INT REFERENCES editoras(id), 
    categoria_id INT REFERENCES categorias(id),
    status VARCHAR(20) DEFAULT 'disponivel' -- ESSENCIAL para a Consulta 1, 8 e 9
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    nome VARCHAR(100), 
    email VARCHAR(100) UNIQUE, 
    data_registro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY, 
    livro_id INT REFERENCES livros(id), 
    usuario_id INT REFERENCES usuarios(id), 
    data_emprestimo DATE DEFAULT CURRENT_DATE, 
    data_devolucao DATE
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY, 
    livro_id INT REFERENCES livros(id), 
    usuario_id INT REFERENCES usuarios(id), 
    data_reserva DATE DEFAULT CURRENT_DATE, 
    status VARCHAR(20) DEFAULT 'Pendente'
);

CREATE TABLE multas (
    id SERIAL PRIMARY KEY, 
    usuario_id INT REFERENCES usuarios(id), 
    valor DECIMAL(10,2), 
    paga BOOLEAN DEFAULT FALSE, -- ESSENCIAL para a Consulta 3
    data_aplicacao DATE DEFAULT CURRENT_DATE, 
    data_pagamento DATE
);