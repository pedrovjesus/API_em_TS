import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { IUsuario } from "../../database/models";
import { UsariosProvider } from "../../database/providers/usuarios";
import { PasswordCrypto } from "../../shared/services/PasswordCrypto";
import { JWTService } from "../../shared/services";

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

  const passwordMatch = await PasswordCrypto.verifyPassword(
    senha,
    result.senha
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Credenciais incorretas",
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: result.id });

    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar acesso",
        },
      });
    }
    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
