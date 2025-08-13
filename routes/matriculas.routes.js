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
 * /matriculas/curso/{curso_id}:
 *   get:
 *     summary: Obtener estudiantes de un curso
 *     description: Devuelve todos los estudiantes inscritos en el curso indicado. Excluye al docente y otros roles no estudiantes.
 *     tags:
 *       - Matriculas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: curso_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del curso en formato UUID
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Estudiante:
 *                     type: string
 *                     format: uuid
 *                     description: ID del estudiante
 *                   nombre_estudiante:
 *                     type: string
 *                     description: Nombre del estudiante
 *                   Curso_id:
 *                     type: string
 *                     format: uuid
 *                     description: ID del curso
 *                   Curso:
 *                     type: string
 *                     description: Nombre del curso
 *             example:
 *               - Estudiante: "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
 *                 nombre_estudiante: "Juan Pérez"
 *                 Curso_id: "494a5828-760c-11f0-8878-c2c469bd52ea"
 *                 Curso: "Matemáticas"
 *               - Estudiante: "b2c3d4e5-f678-9012-abcd-0987654321ef"
 *                 nombre_estudiante: "María López"
 *                 Curso_id: "494a5828-760c-11f0-8878-c2c469bd52ea"
 *                 Curso: "Matemáticas"
 *       404:
 *         description: No se encontraron estudiantes inscritos en el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron estudiantes inscritos en el curso"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sucedió un error, verificar"
 *                 error:
 *                   type: string
 */


/**
 * @swagger
 * /matriculas/usuario/{usuario_id}:
 *   get:
 *     summary: Obtener cursos de un usuario
 *     description: Devuelve los cursos en los que está inscrito un estudiante o docente. Para docentes, devuelve separados por período académico.
 *     tags:
 *       - Matriculas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del usuario en formato UUID
 *     responses:
 *       200:
 *         description: Cursos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Cuenta:
 *                   type: string
 *                   format: uuid
 *                   description: ID del usuario
 *                 Docente:
 *                   type: string
 *                   description: Nombre del usuario
 *                 Rol:
 *                   type: string
 *                   description: Rol del usuario
 *                 Periodo_1:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Cursos inscritos en el periodo 1
 *                 Periodo_2:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Cursos inscritos en el periodo 2
 *                 Periodo_3:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Cursos inscritos en el periodo 3
 *             example:
 *               Cuenta: "f44df6fd-760b-11f0-8878-c2c469bd52ea"
 *               Docente: "Juan Pérez"
 *               Rol: "Docente"
 *               Periodo_1: ["Matemáticas", "Historia"]
 *               Periodo_2: ["Física"]
 *               Periodo_3: []
 *       404:
 *         description: No se encontraron cursos para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El docente no se ha inscrito en ningún curso"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sucedió un error, verificar"
 *                 error:
 *                   type: string
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