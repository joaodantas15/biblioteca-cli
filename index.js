const { program } = require('commander');
const fs = require('fs');
const db = require('./config/database');
const Table = require('cli-table3');

program.version('1.0.0').description('CLI Biblioteca');

// Função para comandos de execução (CREATE, INSERT)
async function runSQL(filePath) {
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        await db.query(sql);
        console.log(`✅ Sucesso: ${filePath} executado.`);
    } catch (err) {
        console.error(`❌ Erro ao executar ${filePath}:`, err.message);
    }
}

// Comandos de Setup
program.command('setup:create').description('Cria as tabelas').action(async () => {
    await runSQL('./sql/schema.sql');
    process.exit();
});

program.command('setup:seed').description('Insere dados iniciais').action(async () => {
    await runSQL('./sql/seed.sql');
    process.exit();
});

// Listagem Simples de Livros
program.command('livros:list').description('Lista todos os livros').action(async () => {
    const res = await db.query('SELECT l.id, l.titulo, a.nome AS autor FROM livros l JOIN autores a ON l.autor_id = a.id');
    const table = new Table({ head: ['ID', 'Título', 'Autor'] });
    res.rows.forEach(row => table.push([row.id, row.titulo, row.autor]));
    console.log(table.toString());
    process.exit();
});

// COMANDO MESTRE PARA AS 10 CONSULTAS
program.command('query <name>')
    .description('Executa uma consulta da pasta sql/queries/')
    .action(async (name) => {
        try {
            const sql = fs.readFileSync(`./sql/queries/${name}.sql`, 'utf8');
            const res = await db.query(sql);
            
            if (res.rows.length > 0) {
                // Cria a tabela automaticamente baseada nas colunas do banco
                const table = new Table({ 
                    head: Object.keys(res.rows[0]),
                    style: { head: ['cyan'] } 
                });
                res.rows.forEach(row => table.push(Object.values(row)));
                console.log(table.toString());
            } else {
                console.log('⚠️ Consulta executada, mas não retornou dados.');
            }
        } catch (err) {
            console.error('❌ Erro na consulta:', err.message);
        } finally {
            process.exit();
        }
    });
    //comando para adicionar um novo usuário via terminal
program.command('usuario:add <nome> <email>')
    .description('Cadastra um novo usuário')
    .action(async (nome, email) => {
        try {
            await db.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
            console.log(`👤 Usuário ${nome} cadastrado com sucesso!`);
        } catch (err) {
            console.error('❌ Erro ao cadastrar:', err.message);
        } finally {
            process.exit();
        }
    });
    // CREATE: Adicionar novo autor
program.command('autor:add <nome> <nacionalidade>')
    .description('Cadastra um novo autor')
    .action(async (nome, nacionalidade) => {
        await db.query('INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2)', [nome, nacionalidade]);
        console.log(`✅ Autor ${nome} cadastrado!`);
        process.exit();
    });

// UPDATE: Atualizar status de reserva
program.command('reserva:status <id> <novo_status>')
    .description('Atualiza o status de uma reserva')
    .action(async (id, novo_status) => {
        await db.query('UPDATE reservas SET status = $1 WHERE id = $2', [novo_status, id]);
        console.log(`✅ Status da reserva ${id} atualizado para ${novo_status}!`);
        process.exit();
    });

// DELETE: Remover um usuário (Cuidado!)
program.command('usuario:del <id>')
    .description('Remove um usuário pelo ID')
    .action(async (id) => {
        await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
        console.log(`🗑️ Usuário ${id} removido.`);
        process.exit();
    });
program.parse(process.argv);