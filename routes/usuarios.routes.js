import { Router } from 'express'

import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

import {
    getAll
} from '../controllers/usuarios.controller.js'

const usuariosRouter = Router()

usuariosRouter.get('/', [isAuth, isAdmin], getAll)


export default usuariosRouter


/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios registrados
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cuenta_id:
 *                     type: string
 *                     format: uuid
 *                     description: ID único del usuario
 *                   nombre:
 *                     type: string
 *                     description: Nombre completo del usuario
 *                   correo:
 *                     type: string
 *                     format: email
 *                     description: Correo electrónico del usuario
 *                   telefono:
 *                     type: string
 *                     description: Número telefónico del usuario
 *                   password_hash:
 *                     type: string
 *                     description: Hash de la contraseña (encriptado)
 *                   cambio_password:
 *                     type: boolean
 *                     description: Indicador si el usuario debe cambiar contraseña en el próximo login
 *                   fecha_creado:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del usuario
 *                   rol:
 *                     type: string
 *                     description: Nombre del rol asignado al usuario
 *       400:
 *         description: Error al obtener los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
