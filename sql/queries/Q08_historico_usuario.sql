SELECT l.titulo, e.data_emprestimo FROM emprestimos e 
JOIN livros l ON e.livro_id = l.id WHERE e.usuario_id = 1;