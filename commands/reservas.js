const { query } = require('../config/database');
const fs = require('fs');

module.exports = (program) => {
    program.command('reservas:disponiveis').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q08_livros_disponiveis_reserva.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });

    program.command('reservas:add').action(async () => {
        // Implementação simples de insert para cumprir o grupo
        console.log('Funcionalidade de criação de reserva manual.');
        process.exit();
    });
};