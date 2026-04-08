const inquirer = require('inquirer');
const { query } = require('../config/database');
const Table = require('cli-table3');
const fs = require('fs');

module.exports = (program) => {
    program.command('livros:list').action(async () => {
        const res = await query('SELECT l.id, l.titulo, a.nome as autor, l.status FROM livros l JOIN autores a ON l.autor_id = a.id');
        const table = new Table({ head: ['ID', 'Título', 'Autor', 'Status'] });
        res.rows.forEach(r => table.push([r.id, r.titulo, r.autor, r.status]));
        console.log(table.toString());
        process.exit();
    });

    program.command('livros:add').action(async () => {
        const ans = await inquirer.prompt([
            { name: 't', message: 'Título:' }, { name: 'a', message: 'ID Autor:' },
            { name: 'e', message: 'ID Editora:' }, { name: 'c', message: 'ID Categoria:' },
            { name: 'ano', message: 'Ano:' }
        ]);
        await query('INSERT INTO livros (titulo, autor_id, editora_id, categoria_id, ano_publicacao) VALUES ($1,$2,$3,$4,$5)', [ans.t, ans.a, ans.e, ans.c, ans.ano]);
        console.log('✅ Livro adicionado!');
        process.exit();
    });

    // Queries obrigatórias
    program.command('livros:disponiveis').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q01_livros_disponiveis.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });

    program.command('livros:sem-emprestimo').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q05_livros_sem_emprestimo.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });

    program.command('livros:mais-reservados').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q06_livros_mais_reservados.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });

    program.command('livros:por-categoria').action(async () => {
        const sql = fs.readFileSync('./sql/queries/Q10_livros_por_categoria.sql', 'utf8');
        const res = await query(sql);
        console.table(res.rows);
        process.exit();
    });
};