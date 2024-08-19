import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController, PessoasController, usuariosController } from './../controllers';



const router = Router();



router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

//rota de cidades

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);

//rotas de pessoas

router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);
router.post('/pessoas', PessoasController.createValidation, PessoasController.create);

//rota de usuarios
router.post('/entrar', usuariosController.signInValidation, usuariosController.signIn);
router.post('/cadastrar', usuariosController.signUpValidation, usuariosController.signUp);


export { router };
