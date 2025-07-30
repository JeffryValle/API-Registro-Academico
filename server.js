import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matriculaRouter from './routes/matriculas.routes.js';

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

// rutas de matriculas
app.use( '/matriculas', matriculaRouter );


app.listen( port, () => {
    console.log( `Server is running on port http://localhost:${ port }` );
});