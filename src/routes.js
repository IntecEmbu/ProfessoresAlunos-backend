import express from "express";

import user from "./controllers/userController.js";
import course from "./controllers/courseController.js";
// import { verifyJWT } from "./middlewares/jwt.js";
import login from "./controllers/loginController.js";
import PostObs from "./controllers/controlerObservatorio.js";
import ListObs from "./controllers/controlerObservatorio.js";
import permUser from "./controllers/permUserController.js";
import setPermUser from './controllers/setPermUserController.js';

const route = express.Router();

//redirecioan as requisições para a controller correspondente
route.use('/user', user);
route.use('/course', course);
route.use("/login", login);
route.use('/PostObs', PostObs);
route.use('/ListObs', ListObs);
route.use('/permUser', permUser);
router.use('/setPermUser', setPermUser);


export default route;