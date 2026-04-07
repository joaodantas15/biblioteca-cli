SELECT l.titulo, ed.nome AS editora FROM livros l 
JOIN editoras ed ON l.editora_id = ed.id;