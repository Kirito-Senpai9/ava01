// Em migrations/TIMESTAMP_criar_tabela_cursos.js

exports.up = function(knex) {
  return knex.schema.createTable('cursos', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('area').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cursos');
};