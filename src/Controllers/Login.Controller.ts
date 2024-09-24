import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UsuariosRepositorio from '../Repositorios/User-Repositorios';

export default class LoginController {
    async login(req: Request, res: Response){
        const {email, senha} = req.body;
        if(!email || !senha){
            return res.status(400).send({"mensagem": "Todos os campos são obrigatórios"});
        }
        const user = await new UsuariosRepositorio().findByEmail(email);
        if(!user){
            return res.status(400).send({
                "mensagem": "E-mail ou senha inválidos"
              })
        }
        try{
        const validarSenha = await bcrypt.compare(senha, user.senha);
        if(!validarSenha){
            return res.status(400).send({"mensagem": "E-mail ou senha inválidos"});
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET ||'', {
            expiresIn: '1d'
        });

        return res.status(200).send({token});
        }catch(error){
            return res.status(400).send({mensagem: (error as Error).message});
        }
    }
}