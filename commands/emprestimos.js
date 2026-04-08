const inquirer = require('inquirer');
const { query } = require('../config/database');

module.exports = (program) => {
    program.command('emprestimos:add').description('Registrar empréstimo').action(async () => {
        const ans = await inquirer.prompt([{ name: 'l', message: 'ID do Livro:' }, { name: 'u', message: 'ID do Usuário:' }]);
        await query('BEGIN');
        await query('INSERT INTO emprestimos (livro_id, usuario_id) VALUES ($1, $2)', [ans.l, ans.u]);
        await query("UPDATE livros SET status = 'emprestado' WHERE id = $1", [ans.l]);
        await query('COMMIT');
        console.log('✅ Empréstimo registrado!');
        process.exit();
    });

    program.command('emprestimos:devolucao').description('Registrar devolução').action(async () => {
        const ans = await inquirer.prompt([{ name: 'id', message: 'ID do Empréstimo:' }]);
        const emp = await query('SELECT livro_id FROM emprestimos WHERE id = $1', [ans.id]);
        if(emp.rows.length > 0) {
            await query('UPDATE emprestimos SET data_devolucao = CURRENT_DATE WHERE id = $1', [ans.id]);
            await query("UPDATE livros SET status = 'disponivel' WHERE id = $1", [emp.rows[0].livro_id]);
            console.log('✅ Devolução registrada!');
        }
        process.exit();
    });
};