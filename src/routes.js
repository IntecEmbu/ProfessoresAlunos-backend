import express from "express";

import obser from "./controllers/obserController.js";
import user from "./controllers/userController.js";
import course from "./controllers/courseController.js";
// import { verifyJWT } from "./middlewares/jwt.js";
import login from "./controllers/loginController.js";
import permUser from './controllers/permUserController.js';
import setPermUser from './controllers/setPermUserController.js';
const route = express.Router();

//redireciona as requisições para a controller correspondente
route.use('/user', user);
route.use('/course', course);
route.use("/login", login);
route.use("/obser", obser)
route.use('/permUser', permUser);
route.use('/setPermUser', setPermUser);



export default route;