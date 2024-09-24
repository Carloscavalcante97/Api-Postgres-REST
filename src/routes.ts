import express from 'express';
import UsuariosController from './Controllers/Usuarios.Controller';
import LoginController from './Controllers/Login.Controller';
import Authentication from './Middlewares/Auth.Middlewares';
import MateriasController from './Controllers/Materias.Controller';
import ResumosController from './Controllers/Resumos.Controller';
import axios from 'axios';

const routes = express.Router();
const user = new UsuariosController();
const logar = new LoginController();
const auth = new Authentication();
const materias = new MateriasController();
const resumos = new ResumosController();

const instaceAxios = axios.create()

routes.post('/usuarios', user.createUser);
routes.post('/login', logar.login);

routes.use(auth.auth);
routes.get('/materias', materias.listar);
routes.post('/resumos', resumos.criar);
routes.get('/resumos', resumos.listar);
routes.put('/resumos/:id', resumos.editar);
routes.delete('/resumos/:id', resumos.deletar);

export default routes;
