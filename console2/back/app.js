const express = require('express');
var cors = require('cors');
const path = require('path');

const app = express();
const uploadUser = require('./middlewares/uploadImage');
const uploadMaterial = require('./middlewares/uploadMaterial');

const Image = require('./models/Images');
const Material = require('./models/material');
const fs = require("fs");
const {createFolder} = require ('./middlewares/createFolder')

app.use('/files', express.static(path.resolve(__dirname,"public", "upload")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

app.get("/ListObs", async (req, res) => {
    await Image.findAll()
    .then((images) => {
        console.log
        return res.json({
            erro: false,
            images,
            // url: "http://localhost:3333/files/users/"
            url: "http://localhost:3333/:id/"
        });
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhuma imagem encontrada!"
        });
    });
});

app.post("/PostObs/:nome", createFolder,uploadUser.single('image'), async (req, res) => {

    if (req.file) {
        //console.log(req.file);
        
        await Image.create({image: req.file.filename})
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Upload realizado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Upload não realizado com sucesso!"
            });
        });
        
    }else{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
        });
    }

});
app.get("/ListMat", async (req, res) => {
    await Material.findAll()
    .then((images) => {
        return res.json({
            erro: false,
            images,
            url: "http://localhost:3333/files/material/"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhuma imagem encontrada!"
        });
    });
});

app.post("/PostMat", uploadMaterial.single('image'), async (req, res) => {

    if (req.file) {
        //console.log(req.file);

        await Material.create({image: req.file.filename})
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Upload realizado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Upload não realizado com sucesso!"
            });
        });
        
    }else{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
        });
    }

});
app.get("/dowload", (req, res) => {
    res.download(__dirname + `/public/upload/material/1669773205718_download.png`)

})

app.listen(3333, () => {
    console.log("Servidor iniciado na porta 3333: http://localhost:3333");
});

