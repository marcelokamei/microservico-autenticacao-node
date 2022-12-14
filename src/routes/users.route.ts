// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

import { Request, Response, NextFunction, Router } from "express";

import StatusCode from 'http-status-codes'
import { DatabaseError } from "pg";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findAllUsers();
        res.status(StatusCode.OK).send(users);
        
    } catch (error) {
        next(error);
    }
});

usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(StatusCode.OK).send(user);
        
    } catch (error) {
        next(error);
    }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = req.body;
        const uuid = await userRepository.create(newUser);
        res.status(StatusCode.CREATED).send(uuid);
        
    } catch (error) {
        next(error);
    }
});

usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;
        await userRepository.update(modifiedUser);
        res.status(StatusCode.OK).send();
        
    } catch (error) {
        next(error);
    }
});


usersRoute.delete('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        await userRepository.remove(uuid);
        res.sendStatus(StatusCode.OK);
        
    } catch (error) {
        next(error);
    }
});

export default usersRoute;