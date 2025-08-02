import { Router } from 'express';
import { getScoreByCurso } from '../controllers/score.controller.js';

const scoreRouter = Router();



// Ver calificaciones por curso 
scoreRouter.get('/curso', getScoreByCurso );
// Ver docentes y los cursos que imparten

// Ver estudiantes que están inscritos en un curso

// Ingresar calificaciones de un estudiante a un curso según el docente

// Actualizar calificaciones de un estudiante a un curso según el docente

export default scoreRouter;

// {
//     "curso_id": "",
//     "cuenta_id": "",
//     "nota": ,
//     "periodo_id": ,
//     "subperiodo_id": 
// }
