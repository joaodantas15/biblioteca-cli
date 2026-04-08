const { query } = require('../config/database');
const fs = require('fs');

module.exports = (program) => {
    program.command('multas:pendentes').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q03_multas_pendentes.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });

    program.command('multas:pagar <id>').action(async (id) => {
        await query('UPDATE multas SET paga = true, data_pagamento = CURRENT_DATE WHERE id = $1', [id]);
        console.log('✅ Multa paga!');
        process.exit();
    });
};