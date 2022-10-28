//tratar requisição do front para cadastro de autorização para um usuário e informar negação ou passar para a Service acessar BD user_perm_link.

import express from 'express';
import {body, validationResult} from 'express-validator';
import db from'../services/permService.js';
//import {generateToken} from'../helpers/userfeatures.js';

const router = express.Router();

//Recebendo requisição do front com 5 parâmetros: classe de usuário solicitante e usuário indicado RM ou GT, número de registro e autorização pretendida.

router.post('/', [body('useregClass').isUppercase().isIn(['RM', 'GT']).withMessage('Informe: RM ou GT'),
		body('useregNumber').isLength({min:3, max: 6}).withMessage('Informe o número de registro'),
		body('regClass').isUppercase().isIn(['RM', 'GT']).withMessage('Informe: RM ou GT'),
		body('regNumber').isLength({min:3, max: 6}).withMessage('Informe o número de registro'),
		body('authority').isLength({min:3, max: 20}).withMessage('Informe o nome da função. Ex. Coordenador')],
		async (request, response)=>{
			const errors = validationResult(request);  //guarda erros de validacao
			if (!errors.isEmpty()){
			  return response.status(400).json({message: errors.array()});
			}
			//Separando dados de usuários solicitante (usereg...), indicado reg... e autorização authority.
			const{useregClass, useregNumber} = request.body;
			const{regClass, regNumber}=request.body;
			const{authority} = request.body;
			try{
				const results = await db.findAuth(regClass,regNumber);		//Obtendo autorizações prévias do usuário indicado.
				let newUserAuth;							//Variável para controle lógico da nova autorização.
				let advice = "Recusado: ";						//Variável para consolidar a mensagem da response.
				if(results.length==0){
					newUserAuth = true;
					//response.status(201).json(newUserAuth);		//Autorização é nova para o usuário indicado.
				}else{									//Usuário indicado tem ao menos uma autorização prévia.
					for (let auth in results){
						if(results[auth].authority_title == authority){		//Compara autorizações prévias com a solicitada.
							newUserAuth = false;
							advice += "Usuário indicado já tem a autorização. ";							
						}else{
							newUserAuth = true;				//Autorização é nova para o usuário indicado.
							}
					}
				}

				const useresults = await db.findAuth(useregClass,useregNumber);	//Obtendo autorizações do 	usuário solicitante.
				let userAuth;									//Controle lógico da autorização do solicitante.
				if(useresults.length==0){
					userAuth = false;
					advice +="Desculpe. Ação não permitida. Sem autorizações. "
				}else{
					userAuth = await db.hierarchy(useresults,authority);		//Checando a regra de negócio para a hierarquia de autorizações.
					//console.log(userAuth);
					if (!userAuth){advice +="Desculpe. Ação não permitida nas suas autorizações. "}
					}
				if (!userAuth || !newUserAuth){response.status(401).json({message:`${advice}`});}	//Response: retorna mensagens negativas consolidadas.
				if (userAuth && newUserAuth){								//Autorizações de acordo com a regra.
					const authresults =await db.insertAuth(regClass, regNumber, authority);	//Aciona service para registro no Banco de Dados.
					if (authresults.length != 0){
						response.status(201).json({message:`Autorização ${authority} atribuida`});}	//Response positiva.
				}
			}catch(err){
				response.status(500).json({message:`Encontramos um erro:${err}`});
			}

});
export default router;