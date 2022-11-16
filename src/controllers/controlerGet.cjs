const express = require('express');
var cors = require('cors');
const path = require('path');

const app = express();
const uploadUser = ('../middlewares/multer.js');

const Image = ('../models/observatorio.js');
const route = express.Router();

route.use('/files', express.static(path.resolve(__dirname,"public", "upload")));

route.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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
            url: "http://localhost:8080/files/users/"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhuma imagem encontrada!"
        });
    });
});


module.export = route;
