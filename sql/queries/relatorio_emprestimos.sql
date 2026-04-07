SELECT e.id, u.nome AS usuario, l.titulo AS livro, e.data_emprestimo
FROM emprestimos e
JOIN usuarios u ON e.usuario_id = u.id
JOIN livros l ON e.livro_id = l.id;