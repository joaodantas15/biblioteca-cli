const inquirer = require('inquirer');
const { query } = require('../config/database');
const fs = require('fs');

module.exports = (program) => {
    program.command('usuarios:list').action(async () => {
        const res = await query('SELECT * FROM usuarios');
        console.table(res.rows);
        process.exit();
    });

    program.command('usuarios:add').action(async () => {
        const ans = await inquirer.prompt([{ name: 'n', message: 'Nome:' }, { name: 'e', message: 'Email:' }]);
        await query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [ans.n, ans.e]);
        console.log('✅ Usuário cadastrado!');
        process.exit();
    });

    program.command('usuarios:top-emprestimos').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q02_usuarios_top_emprestimos.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });

    program.command('usuarios:reservas <id>').action(async (id) => {
        const sql = fs.readFileSync('./sql/queries/Q04_reservas_usuario.sql', 'utf8');
        const res = await query(sql, [id]);
        console.table(res.rows);
        process.exit();
    });

    program.command('usuarios:top-reservas').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q07_usuarios_top_reservas.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });
};