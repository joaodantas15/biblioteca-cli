SELECT l.titulo, a.nome AS autor FROM livros l 
JOIN autores a ON l.autor_id = a.id;