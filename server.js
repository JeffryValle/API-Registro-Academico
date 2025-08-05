import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matriculaRouter from './routes/matriculas.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js' // rutas de autenticación

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

// rutas de matriculas
app.use( '/matriculas', matriculaRouter );

//rutas de usuarios
app.use('/usuarios',usuariosRouter)

app.use('/auth', authRoutes)

// ruta por defecto, cuando no hace match 
app.use((req, res) => {
    res.status(404).json(
        {
            message: `${req.url} no encontrada`
        }
    )
})


app.listen( port, () => {
    console.log( `Server is running on port http://localhost:${ port }` );
});