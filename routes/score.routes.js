import { Router } from 'express';
import { 
    getCursosByDocente, 
    getScoreByCurso, 
    getStudentsByCurso,
    inscribirDocente
} from '../controllers/score.controller.js';

const scoreRouter = Router();

// Ver calificaciones por curso 
scoreRouter.get('/curso', getScoreByCurso );
// Ver docentes y los cursos que imparten
scoreRouter.get('/docente/cursos/:id', getCursosByDocente );
// Ver estudiantes que están inscritos en un curso
scoreRouter.get('/docente/estudiantes', getStudentsByCurso );
// Inscribir un docente a un curso
scoreRouter.post('/docente/inscripcion', inscribirDocente );
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
