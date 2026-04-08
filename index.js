const { program } = require('commander');

program
    .version('1.0.0')
    .description('Biblioteca CLI - IFRN (Versão Modular)');

// Carregando os módulos de comandos conforme estrutura 4.4
require('./commands/setup')(program);
require('./commands/livros')(program);
require('./commands/usuarios')(program);
require('./commands/emprestimos')(program);
require('./commands/reservas')(program);
require('./commands/multas')(program);
require('./commands/relatorios')(program);
require('./commands/administrativo')(program); 
program.parse(process.argv);