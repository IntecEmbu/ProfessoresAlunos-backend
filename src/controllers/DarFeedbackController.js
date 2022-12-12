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

export default router;