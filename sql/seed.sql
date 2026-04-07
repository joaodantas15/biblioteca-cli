--INSERT INTO autores (nome) VALUES ('Autor A'), ('Autor B'), ('Autor C'), ('Autor D'), ('Autor E');
--INSERT INTO editoras (nome) VALUES ('Ed 1'), ('Ed 2'), ('Ed 3'), ('Ed 4'), ('Ed 5');
--INSERT INTO categorias (nome) VALUES ('Ficção'), ('Drama'), ('Terror'), ('Fantasia'), ('Aventura');
--INSERT INTO livros (titulo, autor_id, editora_id, categoria_id) VALUES ('Livro 1', 1, 1, 1), ('Livro 2', 2, 2, 2), ('Livro 3', 3, 3, 3), ('Livro 4', 4, 4, 4), ('Livro 5', 5, 5, 5);
--INSERT INTO usuarios (nome, email) VALUES ('User 1', 'u1@u.com'), ('User 2', 'u2@u.com'), ('User 3', 'u3@u.com'), ('User 4', 'u4@u.com'), ('User 5', 'u5@u.com');

INSERT INTO emprestimos (livro_id, usuario_id, data_emprestimo) 
VALUES (1, 1, CURRENT_DATE), (2, 2, CURRENT_DATE);