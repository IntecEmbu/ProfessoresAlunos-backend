import express, { request, response } from "express";
import { body, validationResult } from 'express-validator';
import db from '../services/addCourseService.js';

const router = express.Router();

router.post('/', async (request, response) => {


  const { nomedoCurso, acronimo, periodo } = request.body;
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }
  try {
    await db.createCourse(nomedoCurso, acronimo, periodo);
    response.status(201).json({ message: 'Curso cadastrado com sucesso' });
  } catch (err) {
    response.status(500).json({
      message:
        `Encontramos um erro: ${err}`
    })
  };

});
router.get('/', async (request, response) => {

  try {
      const result = await db.consultar()
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

export default router