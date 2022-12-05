import express, { response } from "express";
import db from "../services/obserService.js";
import { body, validationResult } from "express-validator";
import multer from 'multer'

const upload = multer({
  dest: 'public/upload'
})

const router = express.Router();

router.post(
  "/",
  //[
  //  body("email").isEmail().withMessage("Informe um email valido"),
  //  body("password")
  //    .isLength({ min: 7, max: 12 })
  //    .withMessage("A senha deve conter entre 7 e 12 caracteres"),
  //],
  async (request, response) => {
    const { titulo, subtitulo, descricao, criador } = request.body;

    const errors = validationResult(request);

    console.log('titulo')

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      await db.insertDoc(titulo, subtitulo, descricao, criador);
      response.status(201).json({ message: "Documento cadastrado com sucesso!" });

      console.log(titulo, subtitulo, descricao, criador);
    } catch (err) {
      response.status(500).json({ message: `Encontramos um erro: ${err}` });
    }
  }
);

router.get('/', async (request, response) => {
  try {
    const results = await db.findObser();

    if(results.length == 0) {
      response.status(204).end();
    } else {
      response.status(200).json(results)
    }
  } catch(err) {
    response.status(500).json({message: `Encontramos um erro: ${err}`});
  }
});

router.post('/image', upload.single('image'), async (request, response) => {
  const encoded = req.file.buffer.toString('base64');
  console.log(encoded)
  console.log('🚀 - file: obserController.js:58 - router.post - encoded', encoded)
  try {
    await db.insertImage(encoded);
    response.status(201).json({ message: "Documento cadastrado com sucesso!" });
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }
})
export default router;
