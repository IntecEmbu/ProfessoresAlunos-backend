import express from "express";

import obser from "./controllers/obserController.js";
import user from "./controllers/userController.js";
import course from "./controllers/courseController.js";
// import { verifyJWT } from "./middlewares/jwt.js";
import login from "./controllers/loginController.js";
import permUser from './controllers/permUserController.js';
import setPermUser from './controllers/setPermUserController.js';
import addCurso from './controllers/addcourseController.js';
import material from './controllers/FeedBackController.js';
import gender from './controllers/testeControler.js';
import darfeed from "./controllers/DarFeedbackController.js";
import avalicao from './controllers/avalicaoController.js';
import nota from './controllers/notaController.js';
const route = express.Router();

//redireciona as requisições para a controller correspondente
route.use('/user', user);
route.use('/course', course);
route.use("/login", login);
route.use("/obser", obser)
route.use('/permUser', permUser);
route.use('/setPermUser', setPermUser);
route.use('/addCurso', addCurso)
route.use('/material', material);
route.use('/gender', gender);
route.use('/darfeed', darfeed);
route.use('/avalicao', avalicao);
route.use('/nota', nota)


export default route;