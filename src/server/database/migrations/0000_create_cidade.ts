import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return await knex.schema.createTable(ETableNames.cidade, (table) => {
    table.bigIncrements("id").primary().index();

    table.string("nome", 150).checkLength("<=", 150).index().notNullable();

    table.comment("Tabela é usada para armazenar cidades do sistema.");
  });

  console.log(`# Created table ${ETableNames.cidade}`);
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(ETableNames.cidade);

  console.log(`# Droped table ${ETableNames.cidade}`);
}
