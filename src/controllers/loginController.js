import db from '../services/loginService.js'
import express from 'express'
import { generateToken} from'../helpers/userFeatures.js';

const router = express.Router();

router.post('/', async (request, response) => {

  //variavel que vai receber o valor do front
  const { userName, sign } = request.body;
 

  try {
    const result = await db.login(userName,sign);

    if(result.length == 0){

      response.status(401).json({message: 'login ou senha invalidos'})
    }
    else{
      const {id_login, user_name} = users[0];
      const token = generateToken(id_login, user_name);
      response.status(200).json({message: 'Login efetuado com sucesso'})
    }
  }
  catch (err) {

  }
})




export default router;