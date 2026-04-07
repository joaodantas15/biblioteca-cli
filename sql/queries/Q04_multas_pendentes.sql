SELECT u.nome, m.valor FROM usuarios u 
JOIN multas m ON u.id = m.usuario_id WHERE m.data_pagamento IS NULL;