import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matriculaRouter from './routes/matriculas.routes.js';
import cursosrouter from './routes/cursos.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js' // rutas de autenticación
import scoreRouter from './routes/score.routes.js';

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

//rutas de autenticación
app.use('/auth', authRoutes)
// rutas de matriculas
app.use( '/matriculas', matriculaRouter );
// rutas de cursos
app.use('/cursos', cursosrouter);
//rutas de usuarios
app.use('/usuarios',usuariosRouter)
// rutas de calificaciones
app.use('/calificaciones', scoreRouter )

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