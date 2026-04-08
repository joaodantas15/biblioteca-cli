-- Limpar tudo antes para não duplicar
DELETE FROM multas; DELETE FROM reservas; DELETE FROM emprestimos;
DELETE FROM usuarios; DELETE FROM livros; DELETE FROM categorias;
DELETE FROM editoras; DELETE FROM autores;

-- 1. Autores (5 registros)
INSERT INTO autores (nome, nacionalidade) VALUES 
('Machado de Assis', 'Brasileira'), ('George Orwell', 'Britânica'), 
('J.K. Rowling', 'Britânica'), ('J.R.R. Tolkien', 'Britânica'), ('Clarice Lispector', 'Brasileira');

-- 2. Editoras (5 registros)
INSERT INTO editoras (nome) VALUES ('Companhia das Letras'), ('Rocco'), ('HarperCollins'), ('Penguin'), ('Arqueiro');

-- 3. Categorias (5 registros)
INSERT INTO categorias (nome) VALUES ('Ficção'), ('Drama'), ('Fantasia'), ('Distopia'), ('Romance');

-- 4. Livros (5 registros - garantindo IDs de 1 a 5)
INSERT INTO livros (titulo, autor_id, editora_id, categoria_id, status) VALUES 
('Dom Casmurro', 1, 1, 2, 'disponivel'),
('1984', 2, 4, 4, 'emprestado'),
('Harry Potter', 3, 2, 3, 'disponivel'),
('O Senhor dos Anéis', 4, 3, 3, 'disponivel'),
('A Hora da Estrela', 5, 1, 2, 'disponivel');

-- 5. Usuários (5 registros)
INSERT INTO usuarios (nome, email) VALUES 
('João Silva', 'joao@email.com'), ('Maria Souza', 'maria@email.com'), 
('Pedro Alves', 'pedro@email.com'), ('Ana Costa', 'ana@email.com'), ('Lucas Lima', 'lucas@email.com');

-- 6. Empréstimos (Garante dados para Consulta 2 e 5)
INSERT INTO emprestimos (livro_id, usuario_id, data_emprestimo) VALUES 
(2, 1, CURRENT_DATE - INTERVAL '1 month'), (1, 1, CURRENT_DATE - INTERVAL '7 months');

-- 7. Reservas (Garante dados para Consulta 4, 6 e 7)
INSERT INTO reservas (livro_id, usuario_id, status) VALUES 
(1, 2, 'Pendente'), (3, 2, 'Pendente'), (4, 3, 'Pendente'), (2, 4, 'Pendente'), (1, 5, 'Pendente');

-- 8. Multas (Garante dados para Consulta 3)
INSERT INTO multas (usuario_id, valor, paga) VALUES (1, 15.00, false), (2, 5.50, false);