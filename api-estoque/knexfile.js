// Arquivo: api-bes/knexfile.js

module.exports = {
development: {
client: 'sqlite3', // Driver do banco de dados

connection: {
filename: './cursos.sqlite3' // Arquivo do banco de dados
},

useNullAsDefault: true, // Configuração padrão para SQLite

migrations: {
  directory: './migrations' // diretorio para versionamento de schema
}

}

};









