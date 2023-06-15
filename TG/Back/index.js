

import express from 'express';
import  r_usuario from './r_usuario.js';
import  r_supervisor from './r_supervisor.js';
import  r_promotor from './r_promotor.js';
import cors from 'cors'
const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", r_usuario)
app.use("/supervisor", r_supervisor)
app.use("/promotor", r_promotor)


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});