const { query } = require('../config/database');
const fs = require('fs');

module.exports = (program) => {
    program.command('relatorios:indisponiveis').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q09_livros_indisponiveis.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });
};