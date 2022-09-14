import express from 'express'

const router = express.Router(); 

router.post('/', async (req, res) => {
  if (req.file) {
    console.log(req.file);
    return res.json({
      erro: false,
      mensagem: "Upload realizado com sucesso!"
    });
  }

  return res.status(400).json({
    erro: true,
    mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
  });
})

export default router