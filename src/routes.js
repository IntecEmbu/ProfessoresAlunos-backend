import express from 'express';


import user from "./controllers/userController.js";
import course from "./controllers/courseController.js";
import { verifyJWT } from './middlewares/jwt.js';
import PostObs from "./controllers/controlerObservatorio.js";
import ListObs from "./controllers/controlerObservatorio.js";

const route = express.Router();

//redirecioan as requisições para a controller correspondente
route.use('/user', user);
route.use('/course', course)
route.use('/PostObs', PostObs);
route.use('/ListObs', ListObs);



export default route;
