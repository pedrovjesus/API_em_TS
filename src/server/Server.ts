import express from 'express';
import cors from 'cors'
import 'dotenv/config';

import './shared/services/TranslationsYup';
import { router } from './routes';


const server = express();


server.use(cors({
    origin: process.env.ENABLE_CORS?.split(';') || [] // <-- aqui coloca o endereço do front para poder fazer as requisições
}));
server.use(express.json());

server.use(router);


export { server };
