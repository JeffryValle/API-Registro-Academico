import { Router } from 'express';
import { 
    actualizarNotas,
    getCursosByDocente, 
    getScoreByCurso, 
    getStudentsByCurso,
    inscribirDocente,
    postearNotas
} from '../controllers/score.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isProfessor } from '../middlewares/isProfessor.js';

const scoreRouter = Router();

scoreRouter.get('/curso', [ isAuth, isProfessor ], getScoreByCurso );
scoreRouter.get('/docente/cursos/:id',[ isAuth, isProfessor ], getCursosByDocente );
scoreRouter.get('/docente/estudiantes',[ isAuth, isProfessor ], getStudentsByCurso );
scoreRouter.post('/docente/inscripcion',[ isAuth, isProfessor ], inscribirDocente );
scoreRouter.post('/',[ isAuth, isProfessor ], postearNotas );
scoreRouter.patch('/',[ isAuth, isProfessor ], actualizarNotas );


export default scoreRouter;

