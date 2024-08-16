import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const deleteByid = async (id: Number): Promise<void | Error> => {
    try {
      const result = await Knex(ETableNames.pessoa)
      .where("id", "=", id)
      .del();
  
      if (result > 0) return;
  
      return new Error("Erro ao apagar registro");
    } catch (error) {
      console.log(error);
      return new Error("Erro ao apagar registro");
    }
  };
  