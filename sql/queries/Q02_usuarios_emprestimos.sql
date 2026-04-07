SELECT u.nome, l.titulo FROM usuarios u 
JOIN emprestimos e ON u.id = e.usuario_id 
JOIN livros l ON e.livro_id = l.id;