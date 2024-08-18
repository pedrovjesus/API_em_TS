import * as create from "./Create";
import * as getAll from "./GetByEmail";

export const UsariosProvider = {
  ...create,
  ...getAll
};