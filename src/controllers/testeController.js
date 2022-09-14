import express from "express";


const router = express.Router();

router.get('/', async (request, response) => {

  response.status(201).json({message: 'Diretor inserido com sucesso'});

 
});

export default router;