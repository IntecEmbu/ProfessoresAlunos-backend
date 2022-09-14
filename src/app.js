import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes.js';

const app = express();
const port = 8080

dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    return res.status(200).json({ message: 'Welcome to INTEC Backend' });
});

app.use(routes); 

app.listen(port, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});