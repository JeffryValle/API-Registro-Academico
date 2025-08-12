import { Router } from 'express'
import { login, createUser, setPassword} from '../controllers/auth.controller.js'

const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', createUser)
authRoutes.patch('/set-password', setPassword)


export default authRoutes


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - user
 *         - password
 *       properties:
 *         user:
 *           type: string
 *           format: email
 *           example: usuario@correo.com
 *         password:
 *           type: string
 *           minLength: 4
 *           maxLength: 255
 *           example: "1234"
 * 
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           example: "juan@correo.com"
 *         phone:
 *           type: string
 *           example: "98765432"
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 100
 *           example: "claveSegura123"
 *         role:
 *           type: string
 *           enum: [admin, estudiante, profesor]
 *           example: "estudiante"
 * 
 *     SetPassword:
 *       type: object
 *       required:
 *         - old_password
 *         - new_password
 *         - confirm_password
 *       properties:
 *         old_password:
 *           type: string
 *           minLength: 6
 *           maxLength: 255
 *           example: "claveAnterior123"
 *         new_password:
 *           type: string
 *           minLength: 6
 *           maxLength: 255
 *           example: "claveNueva456"
 *         confirm_password:
 *           type: string
 *           example: "claveNueva456"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Datos inválidos
 *      
 */

/**
 * @swagger
 * /auth/set-password:
 *   patch:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetPassword'
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */