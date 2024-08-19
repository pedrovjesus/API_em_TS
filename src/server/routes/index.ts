import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController, PessoasController, usuariosController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';



const router = Router();



router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

//rota de cidades

router.get('/cidades',ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id',ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id',ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id',ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);
router.post('/cidades',ensureAuthenticated, CidadesController.createValidation, CidadesController.create);

//rotas de pessoas

router.get('/pessoas',ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id',ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id',ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id',ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);
router.post('/pessoas',ensureAuthenticated, PessoasController.createValidation, PessoasController.create);

//rota de usuarios
router.post('/entrar', usuariosController.signInValidation, usuariosController.signIn);
router.post('/cadastrar', usuariosController.signUpValidation, usuariosController.signUp);


export { router };
