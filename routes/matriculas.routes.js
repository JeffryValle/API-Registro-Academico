import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllMatriculas } from "../controllers/matricula.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const matriculaRouter = Router();

// TODO : matriculaRouter.get   /matriculas             -> obtener todas las matriculas (admin) 
// TODO : matriculaRouter.get   /matriculas/curso/:id   -> ver estudiantes en un curso (admin)
// TODO : matriculaRouter.post  /matriculas             -> matricularse en un curso (estudiante)
// TODO : matriculaRouter.get  /matriculas/usuario/:id  -> ver cursos en los que está inscrito un estudiante (estudiante o admin)

matriculaRouter.get( '/', getAllMatriculas );

export default matriculaRouter;