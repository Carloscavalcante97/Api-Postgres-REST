import {Request, Response} from 'express';
import 'dotenv/config';
import MateriasRepository from '../Repositorios/Materias-Repositorios';

const materiasRepo = new MateriasRepository();
export default class MateriasController {
    async listar(req: Request, res: Response){
        try {
           const resultado = await materiasRepo.listar();
            res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({mensage: "Erro interno"})
    }
}
}