import express, { request, response } from "express";
import { body, validationResult } from 'express-validator';
import db from '../services/courseService.js';

const router = express.Router();

router.post('/', async (request, response) => {
    const { scheduleName } = request.body;

    try {
        const result = await db.findAll(scheduleName);

        response.status(201).json(result);
    } catch (err) {
        response.status(500).json({
            message:
                `Encontramos um erro: ${err}`
        })
    };

});

router.get('/', async (request, response) => {

    try {
        const result = await db.findUser()
        console.log(result)

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



export default router;