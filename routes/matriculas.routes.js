import { Router } from "express";
import { 
    getAllMatriculas, 
    getStudentsByCurso, 
    getCursoByStudent, 
    crearMatricula
} from "../controllers/matricula.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const matriculaRouter = Router();

matriculaRouter.get('/', [ isAuth, isAdmin ], getAllMatriculas);
matriculaRouter.get('/curso/:id', [ isAuth, isAdmin ], getStudentsByCurso);
matriculaRouter.get('/usuario/:id', [ isAuth ], getCursoByStudent);
matriculaRouter.post('/', [ isAuth ], crearMatricula );

export default matriculaRouter; 