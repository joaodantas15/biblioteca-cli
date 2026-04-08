SELECT l.titulo 
FROM reservas r 
JOIN livros l ON r.livro_id = l.id 
WHERE r.usuario_id = $1;