import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, async () => {
    console.log(`Servidor no ar! Rodando na porta ${process.env.PORT}`);
});

server.use([authRoutes, urlRoutes]);
