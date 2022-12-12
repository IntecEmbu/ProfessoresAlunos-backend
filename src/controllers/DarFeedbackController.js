import express, { request, response } from "express";
import { body, validationResult } from 'express-validator';
import db from '../services/DarFeedback.js';

const router = express.Router();

router.post('/', async (request, response) => {

    const { nome, email, material, feedback, descricao } = request.body;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }
    try {
        await db.createFeeback(nome, email, material, feedback, descricao);
        response.status(201).json({ message: 'Feedback realizado com sucesso' });
    } catch (err) {
        response.status(500).json({
            message:
                `Encontramos um erro: ${err}`
        })
    };

});


router.get('/', async (request, response) => {

    try {
        const result = await db.findAll()
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
});


router.put('/', async (request, response) => {
    
    const { id_feedback, descricao } = request.body;

    console.log('teste',id_feedback, descricao)

    try {
        await db.updateGende(id_feedback, descricao);
        response.status(200).json({ message: 'Assunto atulizado com sucesso' })
    } catch (err) {
        response.status(500).json({ message: `Houve um erro ao atualizar Erro: ${err}` })
    }
})

export default router;