import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import urlRouter from './routes/urlRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, async () => {
    console.log(`Servidor no ar! Rodando na porta ${process.env.PORT}`);
});

server.use([authRouter, urlRouter, userRouter]);
