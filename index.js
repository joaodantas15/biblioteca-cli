const inquirer = require('inquirer');
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { query } = require('./config/database');
const Table = require('cli-table3');

// Função auxiliar para rodar SQL e exibir tabela
async function runSQL(filePath, params = []) {
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        const res = await query(sql, params);
        
        if (res && res.rows && res.rows.length > 0) {
            const head = Object.keys(res.rows[0]);
            const table = new Table({ head, style: { head: ['cyan'] } });
            res.rows.forEach(row => table.push(Object.values(row)));
            console.log(table.toString());
        } else {
            console.log('✅ Comando executado com sucesso.');
        }
    } catch (err) {
        console.error('❌ Erro ao executar consulta:', err.message);
    }
}

program
    .version('1.0.0')
    .description('Biblioteca CLI - IFRN');

// --- GRUPO: SETUP ---
program
    .command('setup:create')
    .description('Executa o script DDL e cria todas as tabelas')
    .action(async () => {
        await runSQL('./sql/schema.sql');
        console.log('✅ Tabelas criadas com sucesso!');
        process.exit();
    });

program
    .command('setup:seed')
    .description('Insere os dados de exemplo')
    .action(async () => {
        await runSQL('./sql/seed.sql');
        console.log('✅ Dados inseridos com sucesso!');
        process.exit();
    });

// Novo comando requerido pelo PDF: setup:reset (apaga, cria e popula) 
program
    .command('setup:reset')
    .description('Apaga e recria o banco do zero (drop + create + seed)')
    .action(async () => {
        console.log('🔄 Resetando banco de dados...');
        await runSQL('./sql/schema.sql');
        await runSQL('./sql/seed.sql');
        console.log('✅ Banco resetado e populado com sucesso!');
        process.exit();
    });

// --- GRUPO: LIVROS ---
program
    .command('livros:list')
    .description('Lista todos os livros com status de disponibilidade')
    .action(async () => {
        // Busca todos os livros para a listagem geral
        const res = await query('SELECT id, titulo, status FROM livros');
        const table = new Table({ head: ['ID', 'Título', 'Status'], style: { head: ['cyan'] } });
        res.rows.forEach(row => table.push([row.id, row.titulo, row.status]));
        console.log(table.toString());
        process.exit();
    });

program
    .command('livros:add')
    .description('Cadastra um novo livro interativamente')
    .action(async () => {
        const answers = await inquirer.prompt([
            { name: 'titulo', message: 'Título do livro:' },
            { name: 'autor_id', message: 'ID do Autor:' },
            { name: 'editora_id', message: 'ID da Editora:' },
            { name: 'categoria_id', message: 'ID da Categoria:' },
            { name: 'ano', message: 'Ano de Publicação:' }
        ]);
        
        const sql = 'INSERT INTO livros (titulo, autor_id, editora_id, categoria_id, ano_publicacao, status) VALUES ($1, $2, $3, $4, $5, $6)';
        try {
            await query(sql, [answers.titulo, answers.autor_id, answers.editora_id, answers.categoria_id, answers.ano, 'disponivel']);
            console.log('✅ Livro cadastrado com sucesso!');
        } catch (err) { console.error('❌ Erro:', err.message); }
        process.exit();
    });

program
    .command('livros:disponiveis')
    .description('Consulta 1 — livros disponíveis')
    .action(async () => {
        await runSQL('./sql/queries/Q01_livros_disponiveis.sql'); 
        process.exit();
    });

program
    .command('livros:sem-emprestimo')
    .description('Consulta 5 — sem empréstimo nos últimos 6 meses')
    .action(async () => {
        await runSQL('./sql/queries/Q05_livros_sem_emprestimo.sql'); 
        process.exit();
    });

program
    .command('livros:mais-reservados')
    .description('Consulta 6 — ranking de livros mais reservados')
    .action(async () => {
        await runSQL('./sql/queries/Q06_livros_mais_reservados.sql');
        process.exit();
    });

program
    .command('livros:por-categoria')
    .description('Consulta 10 — livros agrupados por categoria')
    .action(async () => {
        await runSQL('./sql/queries/Q10_livros_por_categoria.sql');
        process.exit();
    });

// --- GRUPO: USUARIOS ---
program
    .command('usuarios:list')
    .description('Lista todos os usuários cadastrados')
    .action(async () => {
        const res = await query('SELECT id, nome, email FROM usuarios');
        const table = new Table({ head: ['ID', 'Nome', 'Email'], style: { head: ['cyan'] } });
        res.rows.forEach(row => table.push([row.id, row.nome, row.email]));
        console.log(table.toString());
        process.exit();
    });

program
    .command('usuarios:add')
    .description('Cadastra um novo usuário')
    .action(async () => {
        const answers = await inquirer.prompt([
            { name: 'nome', message: 'Nome completo:' },
            { name: 'email', message: 'E-mail:' }
        ]);
        try {
            await query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [answers.nome, answers.email]);
            console.log('✅ Usuário cadastrado com sucesso!');
        } catch (err) { console.error('❌ Erro:', err.message); }
        process.exit();
    });

program
    .command('usuarios:top-emprestimos')
    .description('Consulta 2 — usuários com mais empréstimos')
    .action(async () => {
        await runSQL('./sql/queries/Q02_usuarios_top_emprestimos.sql');
        process.exit();
    });

program
    .command('usuarios:top-reservas')
    .description('Consulta 7 — usuários que mais reservam')
    .action(async () => {
        await runSQL('./sql/queries/Q07_usuarios_top_reservas.sql');
        process.exit();
    });

program
    .command('usuarios:reservas <id>')
    .description('Consulta 4 — reservas de um usuário específico')
    .action(async (id) => {
        await runSQL('./sql/queries/Q04_reservas_usuario.sql', [id]);
        process.exit();
    });

// --- GRUPO: CIRCULAÇÃO E RELATÓRIOS ---
program
    .command('multas:pendentes')
    .description('Consulta 3 — lista multas pendentes')
    .action(async () => {
        await runSQL('./sql/queries/Q03_multas_pendentes.sql');
        process.exit();
    });

program
    .command('reservas:disponiveis')
    .description('Consulta 8 — livros disponíveis para reserva')
    .action(async () => {
        await runSQL('./sql/queries/Q08_livros_disponiveis_reserva.sql');
        process.exit();
    });

program
    .command('relatorios:indisponiveis')
    .description('Consulta 9 — livros indisponíveis para empréstimo')
    .action(async () => {
        await runSQL('./sql/queries/Q09_livros_indisponiveis.sql');
        process.exit();
    });

program.parse(process.argv);