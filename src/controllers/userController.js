import express, { request, response } from "express";
import { body, validationResult } from 'express-validator';
import db from '../services/userService.js';

const router = express.Router();

router.post('/', [
  body('email').isEmail().withMessage('informe um email válido'),
  body('password').isLength({ min: 7, max: 12 }).withMessage('a senha deve conter entre 7 e 12 caracteres'),
], async (request, response) => {


  const { userName, regClass, regNumber, birth, email, password, phone, selectedCourse, period } = request.body;
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }
  try {
    const user = await db.findUser(email)
    if (user.length === 0) {
      await db.insertUser(userName, regClass, regNumber, birth, email, password, phone, selectedCourse, period);
      response.status(201).json({ message: 'Usuario cadastrado com sucesso' });
    }else{
      response.status(400).json({
        message:
          `Usuario já existente`
      })
    }
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