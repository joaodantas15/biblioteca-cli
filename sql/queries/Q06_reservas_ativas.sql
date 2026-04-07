SELECT u.nome, l.titulo, r.data_reserva FROM reservas r 
JOIN usuarios u ON r.usuario_id = u.id 
JOIN livros l ON r.livro_id = l.id WHERE r.status = 'Pendente';