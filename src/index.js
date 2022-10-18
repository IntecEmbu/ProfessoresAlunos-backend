import express from "express";
import cors from 'cors';
import routes from './routes.js';

const api = express();

api.use(cors())
api.use(express.json());

api.use('/', routes);  //redireciona a entrada para routes


api.listen('8080', () => {
  console.log('Server is Running...');
});
