import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { PessoasProvider } from "../../database/providers/pessoas";
import { IPessoa } from "../../database/models";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa, "id"> {}

export const updateByIdValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      nome: yup.string().required().min(3),
      sobrenome: yup.string().required().min(3),
      cidadeID: yup.number().required().integer(),
    })
  ),
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parametro "id" precisa ser informado',
      },
    });
  }

  const result = await PessoasProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
