import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";

import jwtAuthenticationMiddleware from "./middlewares/jwt-authentication.middleware";
import { statusRoute } from "./routes/status.route";
import usersRoute from "./routes/users.route";
import basicAuthenticationMiddleware from "./middlewares/basic-authentication.middleware";

const app = express();

//configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuração das rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//configuração dos handlers de erro
app.use(errorHandler);

//inicialização do servidor
app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000.');
});