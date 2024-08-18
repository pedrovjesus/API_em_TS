import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { IUsuario } from "../../database/models";
import { UsariosProvider } from "../../database/providers/usuarios";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().min(6).email().max(150),
      senha: yup.string().required().min(6).max(150),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;
  const result = await UsariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Credenciais incorretas",
      },
    });
  }

  if (senha !== result.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Credenciais incorretas",
      },
    });
  } else {
    return res.status(StatusCodes.OK).json( {accessToken: 'teste.teste.teste.'})
  }

  //    return res.status(StatusCodes.CREATED).json(result);
};
