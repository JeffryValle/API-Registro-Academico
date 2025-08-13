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


/**
 * @swagger
 * tags:
 *   name: Score
 *   description: Gestión de calificaciones y asignaciones de docentes
 */
/**
 * @swagger
 * /calificaciones/curso:
 *   get:
 *     summary: Obtener calificaciones de un curso en un periodo específico
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del estudiante
 *               curso:
 *                 type: string
 *                 description: Nombre del curso
 *               periodo:
 *                 type: integer
 *                 description: Periodo académico (ej. 1, 2, 3)
 *             required:
 *               - nombre
 *               - curso
 *               - periodo
 *     responses:
 *       200:
 *         description: Calificaciones obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Matricula:
 *                         type: string
 *                         format: uuid
 *                         description: ID de matrícula
 *                       Cuenta:
 *                         type: string
 *                         format: uuid
 *                         description: ID del estudiante
 *                       Curso:
 *                         type: string
 *                         format: uuid
 *                         description: ID del curso
 *                       Nombre:
 *                         type: string
 *                         description: Nombre del estudiante
 *                       Nota1:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         description: Nota subperiodo 1
 *                       Nota2:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         description: Nota subperiodo 2
 *                       Nota3:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         description: Nota subperiodo 3
 *                       Promedio:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         description: Promedio de notas
 *                       Estado:
 *                         type: string
 *                         description: Estado de la calificación (Pendiente, APR, RPB)
 *       404:
 *         description: Curso o calificaciones no encontradas
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /calificaciones/docente/cursos/{usuario_id}:
 *   get:
 *     summary: Obtener cursos de un docente por su ID
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del docente (UUID)
 *     responses:
 *       200:
 *         description: Cursos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Cuenta:
 *                         type: string
 *                         format: uuid
 *                       Docente:
 *                         type: string
 *                       Rol:
 *                         type: string
 *                       Periodo_1:
 *                         type: array
 *                         items:
 *                           type: string
 *                         nullable: true
 *                       Periodo_2:
 *                         type: array
 *                         items:
 *                           type: string
 *                         nullable: true
 *                       Periodo_3:
 *                         type: array
 *                         items:
 *                           type: string
 *                         nullable: true
 *       404:
 *         description: Docente no inscrito en ningún curso
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /calificaciones/docente/estudiantes:
 *   get:
 *     summary: Obtener estudiantes inscritos en cursos de un docente (por nombre)
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del docente
 *             required:
 *               - nombre
 *     responses:
 *       200:
 *         description: Estudiantes obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Estudiante:
 *                         type: string
 *                         format: uuid
 *                       nombre_estudiante:
 *                         type: string
 *                       Curso_id:
 *                         type: string
 *                         format: uuid
 *                       Curso:
 *                         type: string
 *       404:
 *         description: No se encontraron estudiantes inscritos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /calificaciones/docente/inscripcion:
 *   post:
 *     summary: Inscribir a un docente en un curso
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del docente
 *               curso:
 *                 type: string
 *                 description: Nombre del curso
 *               periodo:
 *                 type: integer
 *                 description: Periodo académico (1 a 6)
 *             required:
 *               - nombre
 *               - curso
 *               - periodo
 *     responses:
 *       201:
 *         description: Docente inscrito correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     curso:
 *                       type: string
 *                     periodo:
 *                       type: integer
 *       400:
 *         description: Error de validación o límite de inscripciones alcanzado
 *       404:
 *         description: Curso no existe
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /calificaciones:
 *   post:
 *     summary: Insertar una calificación para un estudiante en un curso
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               curso:
 *                 type: string
 *                 description: Nombre del curso
 *               nombre:
 *                 type: string
 *                 description: Nombre del estudiante
 *               nota:
 *                 type: number
 *                 format: float
 *                 description: Nota a insertar
 *               periodo:
 *                 type: integer
 *                 description: Periodo académico
 *               parcial:
 *                 type: integer
 *                 description: Número de subperiodo/parcial
 *             required:
 *               - curso
 *               - nombre
 *               - nota
 *               - periodo
 *               - parcial
 *     responses:
 *       200:
 *         description: Calificación insertada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     curso:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     nota:
 *                       type: number
 *                       format: float
 *                     periodo:
 *                       type: integer
 *                     parcial:
 *                       type: integer
 *       400:
 *         description: Calificación ya insertada previamente o error de validación
 *       404:
 *         description: Curso o estudiante no encontrado
 *       422:
 *         description: No se pudo insertar la calificación
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /calificaciones:
 *   patch:
 *     summary: Actualizar una calificación existente
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               curso:
 *                 type: string
 *                 description: Nombre del curso
 *               nombre:
 *                 type: string
 *                 description: Nombre del estudiante
 *               nota:
 *                 type: number
 *                 format: float
 *                 description: Nota a actualizar
 *               periodo:
 *                 type: integer
 *                 description: Periodo académico
 *               parcial:
 *                 type: integer
 *                 description: Número de subperiodo/parcial
 *             required:
 *               - curso
 *               - nombre
 *               - nota
 *               - periodo
 *               - parcial
 *     responses:
 *       200:
 *         description: Calificación actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     curso:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     nota:
 *                       type: number
 *                       format: float
 *                     periodo:
 *                       type: integer
 *                     parcial:
 *                       type: integer
 *       404:
 *         description: Curso o estudiante no encontrado
 *       422:
 *         description: No se pudo actualizar la calificación
 *       500:
 *         description: Error interno del servidor
 */