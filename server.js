import express from 'express';
import dotenv from 'dotenv';
import { matriculaRouter } from './routes/matriculas.routes.js';

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

// rutas de matriculas
app.use( '/matriculas', matriculaRouter );


app.listen( port, () => {
    console.log( `Server is running on port http://localhost:${ port }` );
});