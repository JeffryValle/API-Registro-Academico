import { Router } from "express";

import {
    listCursos,
    getCursosbyName,
    crearCurso,
    actualizarCurso,
    eliminarCurso
} from "../controllers/cursos.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const cursosrouter = Router();

cursosrouter.get("/", listCursos);
cursosrouter.get("/nombre", [ isAuth, isAdmin ], getCursosbyName);
cursosrouter.post("/", [ isAuth, isAdmin ], crearCurso);
cursosrouter.put("/curso_id", [ isAuth, isAdmin ], actualizarCurso);
cursosrouter.delete("/curso_id", [ isAuth, isAdmin ], eliminarCurso);

export default cursosrouter;
