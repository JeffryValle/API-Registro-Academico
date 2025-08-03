import { Router } from 'express';
import { 
    actualizarNotas,
    getCursosByDocente, 
    getScoreByCurso, 
    getStudentsByCurso,
    inscribirDocente,
    postearNotas
} from '../controllers/score.controller.js';

const scoreRouter = Router();

scoreRouter.get('/curso', getScoreByCurso );
scoreRouter.get('/docente/cursos/:id', getCursosByDocente );
scoreRouter.get('/docente/estudiantes', getStudentsByCurso );
scoreRouter.post('/docente/inscripcion', inscribirDocente );
scoreRouter.post('/', postearNotas );
scoreRouter.patch('/', actualizarNotas );


export default scoreRouter;

// {
//     "curso_id": "",
//     "cuenta_id": "",
//     "nota": ,
//     "periodo_id": ,
//     "subperiodo_id": 
// }
