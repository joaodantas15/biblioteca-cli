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

# Criar as tabelas (schema)
node index.js setup:create

# Inserir dados de teste (seed)
node index.js setup:seed

💻 Como Usar
O sistema funciona através de comandos seguidos de parâmetros.

Comandos de Listagem
Listar Livros: node index.js livros:list

Listar Usuários: node index.js usuarios:list

Execução de Queries Customizadas
Você pode executar qualquer arquivo .sql que esteja dentro da pasta sql/queries/:

```bash
node index.js query <nome_do_arquivo_sem_extensao>
````
Exemplo: node index.js query relatorio_emprestimos
📁 Estrutura do Projeto
index.js: Ponto de entrada da aplicação e definição de comandos.

config/database.js: Configuração da conexão com o pool do PostgreSQL.

sql/: Contém os scripts schema.sql (estrutura) e seed.sql (dados).

sql/queries/: Pasta destinada a relatórios e consultas SQL personalizadas.

🔒 Segurança
O projeto utiliza um arquivo .gitignore para garantir que a pasta node_modules e o arquivo .env (contendo dados sensíveis) não sejam enviados para o controle de versão.
