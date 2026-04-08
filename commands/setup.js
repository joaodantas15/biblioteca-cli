const fs = require('fs');
const { query } = require('../config/database');

module.exports = (program) => {
    program.command('setup:create').description('Cria as tabelas').action(async () => {
        const sql = fs.readFileSync('./sql/schema.sql', 'utf8');
        await query(sql);
        console.log('✅ Tabelas criadas!');
        process.exit();
    });

    program.command('setup:seed').description('Popula o banco').action(async () => {
        const sql = fs.readFileSync('./sql/seed.sql', 'utf8');
        await query(sql);
        console.log('✅ Dados inseridos!');
        process.exit();
    });

    program.command('setup:reset').description('Limpa e reinicia o banco').action(async () => {
        const ddl = fs.readFileSync('./sql/schema.sql', 'utf8');
        const dml = fs.readFileSync('./sql/seed.sql', 'utf8');
        await query(ddl);
        await query(dml);
        console.log('✅ Banco resetado com sucesso!');
        process.exit();
    });
};