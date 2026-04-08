# 📚 Biblioteca CLI

Uma interface de linha de comando (CLI) robusta para gerenciamento de acervo bibliográfico, integrada a um banco de dados PostgreSQL. Este projeto permite realizar operações de CRUD, emitir relatórios complexos via SQL e gerenciar usuários e empréstimos diretamente pelo terminal.

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução.
* **PostgreSQL**: Banco de dados relacional.
* **Commander.js**: Para criação dos comandos CLI.
* **pg (node-postgres)**: Driver de conexão com o banco.
* **dotenv**: Gerenciamento de variáveis de ambiente (segurança).
* **cli-table3**: Formatação de tabelas no terminal.

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone [https://github.com/joaodantas15/biblioteca-cli.git](https://github.com/joaodantas15/biblioteca-cli.git)
cd biblioteca-cli
```
### 2. Instalar Dependências
```bash
npm install
````
### 3. Configurar Variáveis de Ambiente
Crie um arquivo chamado .env na raiz do projeto e adicione suas credenciais do PostgreSQL:
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=biblioteca
DB_PASSWORD=sua_senha
DB_PORT=5432

### 4. Inicializar o Banco de Dados
Certifique-se de que o banco biblioteca existe no seu PostgreSQL. Em seguida, execute os comandos de setup:

# Resetar se necessário
```bash
node index.js setup:reset
````
# Ajuda para visualizar comandos
```bash
node index.js --help
````


# Criar as tabelas (schema)
```bash
node index.js setup:create
````
# Inserir dados de teste (seed)
```bash
node index.js setup:seed
````

💻 Como Usar
O sistema funciona através de comandos seguidos de parâmetros.

Comandos de Listagem
Listar Livros: node index.js livros:list

Listar Usuários: node index.js usuarios:list

Execução de Queries Customizadas
Você pode executar qualquer arquivo .sql que esteja dentro da pasta sql/queries/:

## 💻 Guia Completo de Comandos CLI
node index.js usuarios:add --> adiciona usuário via terminal

node index.js usuarios:list --> lista os usuários



| Nº | Pergunta de Negócio | Comando para rodar no Terminal |
| :--- | :--- | :--- |
| 1 | Livros disponíveis | `node index.js livros:disponiveis` |
| 2 | Usuários com mais empréstimos | `node index.js usuarios:top-emprestimos` |
| 3 | Multas pendentes | `node index.js multas:pendentes` |
| 4 | Reservas de um usuário específico | `node index.js usuarios:reservas 2` |
| 5 | Livros sem empréstimo (6 meses) | `node index.js livros:sem-emprestimo` |
| 6 | Livros mais reservados | `node index.js livros:mais-reservados` |
| 7 | Usuários que mais reservam | `node index.js usuarios:top-reservas` |
| 8 | Livros disponíveis para reserva | `node index.js reservas:disponiveis` |
| 9 | Livros indisponíveis | `node index.js relatorios:indisponiveis` |
| 10 | Livros por categoria (Agregado) | `node index.js livros:por-categoria` |


Abaixo estão listados todos os comandos implementados, divididos por grupos funcionais conforme as exigências do projeto.

### 🛠️ Grupo: Setup (Inicialização do Banco)
| Comando | Descrição |
| :--- | :--- |
| `node index.js setup:create` | Cria as tabelas no banco de dados (DDL) |
| `node index.js setup:seed` | Popula o banco com os dados iniciais de exemplo (DML) |
| `node index.js setup:reset` | Apaga tudo, recria as tabelas e popula os dados (Reset total) |

### 📚 Grupo: Livros (Gestão e Consultas)
| Comando | Descrição |
| :--- | :--- |
| `node index.js livros:list` | Lista geral: ID, Título, Autor e Status atual |
| `node index.js livros:add` | Cadastro interativo de um novo livro no acervo |
| `node index.js livros:disponiveis` | **[Q1]** Lista apenas livros com status 'disponivel' |
| `node index.js livros:sem-emprestimo` | **[Q5]** Livros sem movimentação nos últimos 6 meses |
| `node index.js livros:mais-reservados` | **[Q6]** Ranking dos títulos com mais reservas |
| `node index.js livros:por-categoria` | **[Q10]** Agrupamento de livros por categoria |

### 👥 Grupo: Usuários
| Comando | Descrição |
| :--- | :--- |
| `node index.js usuarios:list` | Lista todos os usuários cadastrados e seus e-mails |
| `node index.js usuarios:add` | Cadastro interativo de um novo usuário |
| `node index.js usuarios:top-emprestimos` | **[Q2]** Ranking de usuários com maior volume de empréstimos |
| `node index.js usuarios:reservas <id>` | **[Q4]** Lista todas as reservas de um usuário específico |
| `node index.js usuarios:top-reservas` | **[Q7]** Ranking de usuários que mais utilizam o sistema de reservas |

### 🔄 Grupo: Circulação (Empréstimos e Devoluções)
| Comando | Descrição |
| :--- | :--- |
| `node index.js emprestimos:add` | Registra empréstimo (Altera status do livro para 'emprestado') |
| `node index.js emprestimos:devolucao` | Registra devolução (Altera status do livro para 'disponivel') |

### 🎫 Grupo: Reservas e Multas
| Comando | Descrição |
| :--- | :--- |
| `node index.js reservas:disponiveis` | **[Q8]** Lista livros que podem receber novas reservas |
| `node index.js reservas:add` | Registro manual de uma nova reserva no sistema |
| `node index.js multas:pendentes` | **[Q3]** Lista todas as multas com status 'paga = false' |
| `node index.js multas:pagar <id>` | Baixa de pagamento de multa e registro da data de pagamento |

### 📊 Grupo: Relatórios Adicionais
| Comando | Descrição |
| :--- | :--- |
| `node index.js relatorios:indisponiveis` | **[Q9]** Relatório de livros que não podem ser emprestados no momento |



📁 Estrutura do Projeto
comands/ : Pasta que possui os arquivos JS com os comandos. 
index.js: Ponto de entrada da aplicação e definição de comandos.

config/database.js: Configuração da conexão com o pool do PostgreSQL.

sql/: Contém os scripts schema.sql (estrutura) e seed.sql (dados).

sql/queries/: Pasta destinada a relatórios e consultas SQL personalizadas.

🔒 Segurança
O projeto utiliza um arquivo .gitignore para garantir que a pasta node_modules e o arquivo .env (contendo dados sensíveis) não sejam enviados para o controle de versão.
