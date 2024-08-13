import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteByid = async (id: Number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
    .where("id", "=", id)
    .del();

    if (result > 0) return;

    return new Error("Erro ao apagar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao apagar registro");
  }
};
