const http = require('http');
const express = require('express');
const status = require('http-status');
const sequelize = require('./src/database/db');
const app = express();
const cors = require('cors');
const routes = require('./src/routes/router');

//inicia a aplicação em formato json
app.use(express.json());

//URL base do sistema, o resto é preenchido pelo routes

app.use('/priDoces', cors(), routes);

//Tratamento de erro de página não encontrada
app.use((req, res, next) => {
    res.status.apply(status.NOT_FOUND).send("Page not found");
});

//Tratamento de erro interno do servidor
app.use((req, res, next) =>{
    res.status.apply(status.INTERNAL_SERVER_ERROR).json({error});

});

//Sincronizando o sequelize, 
//({force: false}) = não deixa com que a aplicação apague a tabela existente e crie uma nova a cada acesso do usuário
sequelize.sync({force: false}).then( () =>{
    const port = 3003;
    app.set("port", port);

    const server = http.createServer(app);
    server.listen(port);
});