import express from "express";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { statusRoute } from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

//configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuração das rotas
app.use(usersRoute);
app.use(statusRoute);

//configuração dos handlers de erro
app.use(errorHandler);

//inicialização do servidor
app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000.');
});