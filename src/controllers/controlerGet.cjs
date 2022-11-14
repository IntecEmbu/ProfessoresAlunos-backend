const express = require('express');
var cors = require('cors');
const path = require('path');

const route = express();

const Image = ('../models/observatorio.js');

route.use('/files', express.static(path.resolve(__dirname,"../","public", "upload", )));

route.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

route.get("/", async (req, res) => {
    await Image.findAll()
    .then((images) => {
        return res.json({
            erro: false,
            images,
            url: "http://localhost:8080/files/observatorio/"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhuma imagem encontrada!"
        });
    });
});

module.exports = route;