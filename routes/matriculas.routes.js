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



/**
 * @swagger
 * tags:
 *   name: Matriculas
 *   description: Endpoints para gestionar matrículas de estudiantes en cursos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Matricula:
 *       type: object
 *       properties:
 *         Matricula:
 *           type: string
 *           format: uuid
 *           example: "94e2a8a8-760f-11f0-bac1-2f85a9a5a3c3"
 *         Nombre:
 *           type: string
 *           example: "Juan Pérez"
 *         Cuenta:
 *           type: string
 *           format: uuid
 *           example: "24dce0e0-7610-11f0-bac1-2f85a9a5a3c3"
 *         Curso:
 *           type: string
 *           example: "Matemáticas Avanzadas"
 *         CodigoCurso:
 *           type: string
 *           format: uuid
 *           example: "494a5828-760c-11f0-8878-c2c469bd52ea"
 *
 *     CrearMatriculaBody:
 *       type: object
 *       required:
 *         - cuenta
 *         - curso
 *         - periodo
 *       properties:
 *         cuenta:
 *           type: string
 *           format: uuid
 *           example: "24dce0e0-7610-11f0-bac1-2f85a9a5a3c3"
 *         curso:
 *           type: string
 *           description: Nombre del curso
 *           example: "Matemáticas Avanzadas"
 *         periodo:
 *           type: integer
 *           example: 20241
 */
/**
 * @swagger
 * /matriculas:
 *   get:
 *     summary: Obtener todas las matrículas
 *     tags: [Matriculas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las matrículas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Matricula'
 *       404:
 *         description: No hay matrículas existentes
 */


/**
 * @swagger
 * /matriculas/curso/{id}:
 *   get:
 *     summary: Obtener estudiantes matriculados en un curso específico
 *     tags: [Matriculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de estudiantes en el curso
 *       404:
 *         description: No existen estudiantes en este curso
 */

/**
 * @swagger
 * /matriculas/usuario/{id}:
 *   get:
 *     summary: Obtener cursos en los que está inscrito un estudiante
 *     tags: [Matriculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la cuenta del estudiante
 *     responses:
 *       200:
 *         description: Lista de cursos del estudiante
 *       404:
 *         description: No existen cursos para este estudiante
 */

/**
 * @swagger
 * /matriculas:
 *   post:
 *     summary: Crear una nueva matrícula
 *     tags: [Matriculas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearMatriculaBody'
 *     responses:
 *       201:
 *         description: Matrícula creada correctamente
 *       400:
 *         description: Error de validación o sin cupos disponibles
 */