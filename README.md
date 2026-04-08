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

### Comandos CLI 
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

## 🛠️ Comandos de Gestão (Operações CRUD)

Estes comandos permitem gerenciar os registros do sistema de forma interativa ou direta.

### 📚 Grupo: Livros
| Comando | Descrição |
| :--- | :--- |
| `node index.js livros:list` | Lista todos os livros, autores e status atual |
| `node index.js livros:add` | Cadastro interativo de um novo livro |

### 👥 Grupo: Usuários
| Comando | Descrição |
| :--- | :--- |
| `node index.js usuarios:list` | Lista todos os usuários cadastrados |
| `node index.js usuarios:add` | Cadastro interativo de um novo usuário |

### 🔄 Grupo: Circulação (Empréstimos e Devoluções)
| Comando | Descrição |
| :--- | :--- |
| `node index.js emprestimos:add` | Registra um novo empréstimo e atualiza o status do livro |
| `node index.js emprestimos:devolucao` | Registra a devolução e libera o livro para o acervo |

### 🎫 Grupo: Reservas e Multas
| Comando | Descrição |
| :--- | :--- |
| `node index.js reservas:add` | Registra uma nova reserva de livro |
| `node index.js multas:pagar <id>` | Registra o pagamento de uma multa específica pelo ID |

---

📁 Estrutura do Projeto
comands/ : Pasta que possui os arquivos JS com os comandos. 
index.js: Ponto de entrada da aplicação e definição de comandos.

config/database.js: Configuração da conexão com o pool do PostgreSQL.

sql/: Contém os scripts schema.sql (estrutura) e seed.sql (dados).

sql/queries/: Pasta destinada a relatórios e consultas SQL personalizadas.

🔒 Segurança
O projeto utiliza um arquivo .gitignore para garantir que a pasta node_modules e o arquivo .env (contendo dados sensíveis) não sejam enviados para o controle de versão.
