import db from "../services/loginService.js";
import express from 'express';
import { generateToken } from "../helpers/userFeatures.js";

const router = express.Router();

router.post("/", async (request, response) => {
  //visualização dos dados recebidos do front
  var payload = request.body;
  //convertendo pra json
  console.log("Request >>> " + JSON.stringify(payload))

  //variavel que vai receber o valor do front
  const { user_name, senha, registro_classe, registro_numero } = request.body;
  console.log("Request Body >>> " + JSON.stringify({user_name, senha, registro_classe, registro_numero }));

  try {
    const results = await db.login( user_name, senha, registro_classe, registro_numero );

    console.log("Results >>> " + JSON.stringify(results));
    console.log("Results Length >>> " + JSON.stringify(results).length);

    if (results.length == 0) {
      response.status(401).json({ message: "login ou senha invalidos" });
    } else {
      const { id_user, user_name } = results[0];
      const token = generateToken(id_user, user_name);
      response.status(200).json({ message: "Login efetuado com sucesso", token });

      // router.get('/', async (request, response) => {
      //   try {
      //     const name = results;
      //     console.log("Results >>>" + JSON.stringify(name));
      
      //     if(name.length == 0) {
      //       response.status(204).end();
      //     } else {
      //       response.status(200).json(name)
      //     }
      //   } catch(err) {
      //     response.status(500).json({message: `Encontramos um erro: ${err}`});
      //   }
      // });

    }
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
    console.log(err.stack);
  }
});

// router.get('/', async (request, response) => {
//   try {
//     const results = await db.namePersol();
//     console.log(results);

//     if(results.length == 0) {
//       response.status(204).end();
//     } else {
//       response.status(200).json(results)
//     }
//   } catch(err) {
//     response.status(500).json({message: `Encontramos um erro: ${err}`});
//   }
// });

export default router;