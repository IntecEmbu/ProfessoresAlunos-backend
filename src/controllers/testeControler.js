import express, { response } from "express";
import { body, validationResult } from 'express-validator';
import { generatePdf } from "html-pdf-node";

import db from '../services/testeSevice.js';

//variavel 
const router = express.Router();


//request é oq o front envia para o back 
//response oq o back envia para o front
router.post('/',async (request, response) => {
    const {  genero, assunto } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }
    //debug
    console.log("material, assunto:", genero, assunto);
    //inseri os dados
    try {
        await db.insertGenero(genero, assunto);
        response.status(201).json({ message: 'Material cadastrado com sucesso' });
    } catch (err) {
        response.status(500).json({
            message:
                `Encontramos um erro: ${err}`
        })
    };

});

router.get('/', async (request, response) => {

    try {
        const result = await db.findgenero()
        // console.log(result)

        if (result.length == 0) {
            response.status(204).end('encontramos um erro')
        }
        else {
            response.status(200).json(result)
        }
    }
    catch {
        response.status(500).json(error)
    }

})


router.put('/', async (request, response) => {
    
    const { id_genero, genero } = request.body;

    console.log('teste', id_genero, genero)

    try {
        await db.updateGender(id_genero, genero);
        response.status(200).json({ message: 'Material atulizado com sucesso' })
    } catch (err) {
        response.status(500).json({ message: `Houve um erro ao atualizar Erro: ${err}` })
    }
})

router.put('/assunto', async (request, response) => {
    
    const { id_genero, assunto } = request.body;

    console.log('teste', id_genero, assunto)

    try {
        await db.updateGende(id_genero, assunto);
        response.status(200).json({ message: 'Assunto atulizado com sucesso' })
    } catch (err) {
        response.status(500).json({ message: `Houve um erro ao atualizar Erro: ${err}` })
    }
})

router.delete('/:id_genero', async (request, response) => {
    const { id_genero } = request.params
    try {
        await db.deleteGender(id_genero);
        response.status(200).json({ message: 'Item excluido com sucesso' })
    } catch (err) {
        response.status(500).json({ message: `Houve um erro ao excluir Erro: ${err}` })
    }

})
export default router;