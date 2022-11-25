import express from "express";

import user from "./controllers/userController.js";
import course from "./controllers/courseController.js";
// import { verifyJWT } from "./middlewares/jwt.js";
import login from "./controllers/loginController.js";
const route = express.Router();

//redireciona as requisições para a controller correspondente
route.use('/user', user);
route.use('/course', course);
route.use("/login", login);




export default route;