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
matriculaRouter.get('/curso/:id', getStudentsByCurso);
matriculaRouter.get('/usuario/:id', getCursoByStudent);
matriculaRouter.post('/', crearMatricula );

export default matriculaRouter;