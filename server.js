import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matriculaRouter from './routes/matriculas.routes.js';
import cursosrouter from './routes/cursos.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js' // rutas de autenticación
import scoreRouter from './routes/score.routes.js';
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// Seguridad con Helmet
app.use(helmet());

// Limitar el número de solicitudes
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 10, // Limitar a 10 solicitudes por IP
    message: {
        success: false,
        message: "Demasiadas solicitudes, espere un momento."
    },
});
app.use(limiter);

app.use(express.json());

app.use(cors({
    // configuración de los origenes permitidos
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
    // metodos permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // encabezados permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'Bearer', 'api-key']
}));

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