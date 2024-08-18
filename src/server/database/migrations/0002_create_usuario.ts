import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return await knex.schema.createTable(ETableNames.usuario, (table) => {
    table.bigIncrements("id").primary().index();
    table.string("nome", 150).notNullable().checkLength('>', 3);
    table.string("email").unique().notNullable().checkLength('>', 6);
    table.string("senha").notNullable().checkLength('>', 5);


    table.comment("Tabela é usada para armazenar usuarios do sistema.");
  });

  console.log(`# Created table ${ETableNames.usuario}`);
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(ETableNames.usuario);

  console.log(`# Droped table ${ETableNames.usuario}`);
}
