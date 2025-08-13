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

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Endpoints para gestión de cursos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       properties:
 *         curso_id:
 *           type: string
 *           format: uuid
 *           description: ID único del curso
 *         nombre:
 *           type: string
 *           example: Matemáticas Avanzadas
 *         cupos:
 *           type: integer
 *           example: 30
 *       required:
 *         - nombre
 *         - cupos
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Listar todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */

cursosrouter.get("/", listCursos);
/**
 * @swagger
 * /cursos/nombre:
 *   get:
 *     summary: Obtener un curso por su nombre
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: No se encontró un curso con ese nombre
 */
cursosrouter.get("/nombre", [ isAuth, isAdmin ], getCursosbyName);

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - cupos
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Matemáticas Avanzadas
 *               cupos:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: Curso creado correctamente
 *       400:
 *         description: Datos inválidos
 */
cursosrouter.post("/", [ isAuth, isAdmin ], crearCurso);

/**
 * @swagger
 * /cursos/{curso_id}:
 *   put:
 *     summary: Actualizar un curso existente
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: curso_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del curso a actualizar
 *     requestBody:
 *       description: Datos para actualizar el curso
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - cupos
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Matemáticas Avanzadas
 *               cupos:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error interno del servidor
 */

cursosrouter.put("/:curso_id", [ isAuth, isAdmin ], actualizarCurso);

/**
 * @swagger
 * /cursos/{curso_id}:
 *   delete:
 *     summary: Eliminar un curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: curso_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del curso a eliminar
 *     responses:
 *       200:
 *         description: Curso eliminado correctamente
 *       404:
 *         description: Curso no encontrado
 */
cursosrouter.delete("/:curso_id", [ isAuth, isAdmin ], eliminarCurso);

export default cursosrouter;
