import { NextFunction,Request,Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
export default class Authentication {
    async auth(req:Request,res:Response, next: NextFunction){
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({
                "mensagem": "Falha na autenticação"
              })}
              const token = authorization.split(' ')[1];
              try{
                await jwt.verify(token, process.env.SECRET || '');
                next();
              }catch(error){
                return res.status(401).json({
                    "mensagem": "Falha na autenticação"
              })
    }
}
}