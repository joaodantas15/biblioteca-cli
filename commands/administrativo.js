const inquirer = require('inquirer');
const { query } = require('../config/database');
const Table = require('cli-table3');

module.exports = (program) => {
    // AUTORES
    program.command('autores:list').description('Lista todos os autores').action(async () => {
        const res = await query('SELECT * FROM autores');
        const table = new Table({ head: ['ID', 'Nome', 'Nacionalidade'] });
        res.rows.forEach(r => table.push([r.id, r.nome, r.nacionalidade]));
        console.log(table.toString());
        process.exit();
    });

    program.command('autores:add').description('Cadastra novo autor').action(async () => {
        const ans = await inquirer.prompt([
            { name: 'n', message: 'Nome do Autor:' },
            { name: 'nac', message: 'Nacionalidade:' }
        ]);
        await query('INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2)', [ans.n, ans.nac]);
        console.log('✅ Autor cadastrado!');
        process.exit();
    });

    // EDITORAS
    program.command('editoras:list').description('Lista todas as editoras').action(async () => {
        const res = await query('SELECT * FROM editoras');
        const table = new Table({ head: ['ID', 'Nome', 'Endereço'] });
        res.rows.forEach(r => table.push([r.id, r.nome, r.endereco]));
        console.log(table.toString());
        process.exit();
    });

    // CATEGORIAS
    program.command('categorias:list').description('Lista todas as categorias').action(async () => {
        const res = await query('SELECT * FROM categorias');
        const table = new Table({ head: ['ID', 'Nome', 'Descrição'] });
        res.rows.forEach(r => table.push([r.id, r.nome, r.descricao]));
        console.log(table.toString());
        process.exit();
    });
};