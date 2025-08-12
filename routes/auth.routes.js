import { Router } from 'express'
import { login, createUser, setPassword} from '../controllers/auth.controller.js'

const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', createUser)
authRoutes.patch('/set-password', setPassword)


export default authRoutes


/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para manejo de usuarios y autenticación
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 format: email
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI..."
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@correo.com
 *               phone:
 *                 type: string
 *                 example: "98765432"
 *               password:
 *                 type: string
 *                 example: "contraseñaSegura123"
 *               role:
 *                 type: string
 *                 enum: [admin, estudiante, profesor]
 *                 example: estudiante
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos o email ya registrado
 */

/**
 * @swagger
 * /auth/set-password:
 *   patch:
 *     summary: Cambia la contraseña de un usuario
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *                 example: "miAntiguaClave"
 *               new_password:
 *                 type: string
 *                 example: "miNuevaClave123"
 *               confirm_password:
 *                 type: string
 *                 example: "miNuevaClave123"
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *       400:
 *         description: Datos inválidos o contraseñas no coinciden
 *       401:
 *         description: Token no válido o expirado
 */
