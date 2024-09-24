import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import UsuariosRepositorio from "../Repositorios/User-Repositorios";

const userRepo = new UsuariosRepositorio();
export default class UsuariosController {
    async createUser(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

         if (!nome || !email || !senha) {
            return res.status(400).send({mensagem: "Todos os campos são obrigatórios"});
        }

        const validandoEmail = await new UsuariosRepositorio().findByEmail(email);

        if(validandoEmail){
            return res.status(400).send({mensagem: "E-mail já cadastrado"});
        }
        try {
        const user = {
            nome,
            email,
            senha
        }
        const hash = bcrypt.hashSync(user.senha, 10);
        user.senha = hash;
        const newUser = await userRepo.criar(user);
        res.status(201).json(newUser);
            
        } catch (error) {
            res.status(500).send({mensagem: "Erro interno"});
        }
    }
}