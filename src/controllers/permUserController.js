//tratar requisição do front e informar negação ou passar para a Service acessar BD user_perm_link

import express from 'express';
import {body, validationResult} from 'express-validator';
import db from'../services/permUserService.js';
//import {generateToken} from'../helpers/userfeatures.js';

const router = express.Router();

router.post('/', [body('regClass').isUppercase().isLength({min: 2, max: 2}).withMessage('Informe: RM, RA ou GT'),
		body('regNumber').isLength({min:3, max: 6}).withMessage('Informe o número de registro')],
		async (request, response)=>{
			const errors = validationResult(request);  //guarda erros de validacao
			if (!errors.isEmpty()){
			  return response.status(400).json({message: errors.array()});
			}
			const{regClass, regNumber}=request.body;
			//console.log(`${regClass}, ${regNumber}`);
			try{
				const results = await db.findAuth(regClass,regNumber);
				if(results.length==0){
					response.status(401).json({message:'Desculpe. Sem autorização'})
				}else{
					const permData=results;	//contem lista de authorityCode, authorityTitle
					response.status(200).json(permData);
			}}catch(err){
				response.status(500).json({message:`Encontramos um erro:${err}`});
			}

});
export default router;