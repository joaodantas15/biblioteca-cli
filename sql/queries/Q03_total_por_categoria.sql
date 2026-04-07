SELECT c.nome, COUNT(l.id) AS total_livros FROM categorias c 
LEFT JOIN livros l ON c.id = l.categoria_id GROUP BY c.nome;