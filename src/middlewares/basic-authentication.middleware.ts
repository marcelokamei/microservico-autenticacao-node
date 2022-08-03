import { NextFunction, Response, Request } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

export default async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ')
        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido.')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':')

        if (!username || !password) {
            throw new ForbiddenError('Credenciais não preenchidas.')
        }

        const user = await userRepository.findByUsernameAndPassword(username, password);
        
        if(!user || !password){
            throw new ForbiddenError('Usuário ou senha inválidos.');
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};