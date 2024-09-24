import {Request, Response} from 'express';
import ResumosRepository from '../Repositorios/Resumos-Repositorios';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import UsuariosRepositorio from '../Repositorios/User-Repositorios';
import TResumo from '../tipos/TResumo';
import { gerarDescricaoGemini } from './Chat.Controller';

const resumoRepo = new ResumosRepository();

export default class ResumosController {
    async criar(req:Request, res: Response){
        const {materiaId, titulo, topicos, descricao} = req.body;
        const authorization = req.headers.authorization;

        if (typeof materiaId !== 'number' || !materiaId || !topicos ||
            !Array.isArray(topicos) || topicos.length === 0) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
        }
        if(!authorization){
            return res.status(404).json({"mensagem": "Falha na autenticação"});
        }
        const token = authorization.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.SECRET || '') 
        const usuarioId =  (decoded as any).id;
        const usuario = await new UsuariosRepositorio().findById(usuarioId);
            
            const materiaExistente = await resumoRepo.findByid(materiaId);
            if(!materiaExistente){
            return res.status(404).json({"mensagem": "Matéria não encontrada"})}
            const descricaoGerada = await gerarDescricaoGemini(topicos) || descricao;

           
            const resumo: TResumo = { 
                usuarioId: usuario.id,
                materiaId,
                titulo: titulo||"Sem título",
                topicos: topicos.join(', '),
                descricao: descricaoGerada,
                criado: new Date().toISOString()
            };
            const resultado = await resumoRepo.criar(resumo);
            return res.status(201).json(resultado);
        
            
        }
    async listar(req:Request, res: Response){
        const resumos = await resumoRepo.listar();
        return res.status(200).json(resumos);
    }
    
    async editar(req:Request, res: Response){
        const {id} = req.params;
        const {titulo, topicos, descricao} = req.body;
        if(!id || !titulo || !topicos || !descricao){
            return res.status(400).json({mensagem: "Informe o id, titulo, topicos e descrição do resumo"});
        }
        const resumo = await resumoRepo.findResumoByid(Number(id));
        if(!resumo){
            return res.status(404).json({mensagem: "Resumo não encontrado"});
        }
        const resumoAtualizado = await resumoRepo.editar(titulo, topicos, descricao, resumo.id);
        return res.status(200).json(resumoAtualizado);
    }

    async deletar (req:Request, res: Response){
        const {id} = req.params;
        if(!id){
            return res.status(400).json({mensagem: "Informe o id do resumo"});
        }
        const resultado = await resumoRepo.deletar(Number(id));
        return res.status(200).json(resultado);
    }
}