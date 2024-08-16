import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return await knex.schema.createTable(ETableNames.pessoa, (table) => {
    table.bigIncrements("id").primary().index();
    table.string("nome", 150).index().notNullable();
    table.string("sobrenome", 150).index().notNullable();
    table.string("email").unique().notNullable();

    table
      .bigInteger("cidadeId")
      .index()
      .notNullable()
      .references("id")
      .inTable(ETableNames.cidade)
      .onUpdate('CASCADE')
      .onUpdate('RESTRICT')

    table.comment("Tabela é usada para armazenar pessoas do sistema.");
  });

  console.log(`# Created table ${ETableNames.pessoa}`);
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(ETableNames.pessoa);

  console.log(`# Droped table ${ETableNames.pessoa}`);
}
