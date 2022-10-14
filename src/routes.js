import express from 'express';

import PostObs from "./controllers/controlerObservatorio.js";
import ListObs from "./controllers/controlerObservatorio.js";


const route = express.Router();

//redirecioan as requisições para a controller correspondente
route.use('/PostObs', PostObs);
route.use('/ListObs', ListObs);



export default route;
