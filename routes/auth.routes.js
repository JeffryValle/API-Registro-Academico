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
 *           description: Correo electrónico del usuario.
 *           example: usuario@correo.com
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
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
 *           description: Nombre completo del usuario.
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico válido del usuario.
 *           example: "juan@correo.com"
 *         phone:
 *           type: string
 *           description: Número de teléfono sin espacios ni guiones.
 *           example: "98765432"
 *         password:
 *           type: string
 *           description: Contraseña segura (mínimo 8 caracteres).
 *           minLength: 8
 *           maxLength: 100
 *           example: "ClaveSegura123!"
 *         role:
 *           type: string
 *           description: Rol asignado al usuario.
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
 *           description: Contraseña actual.
 *           minLength: 6
 *           maxLength: 255
 *           example: "ClaveAnterior123"
 *         new_password:
 *           type: string
 *           description: Nueva contraseña (mínimo 6 caracteres).
 *           minLength: 6
 *           maxLength: 255
 *           example: "ClaveNueva456"
 *         confirm_password:
 *           type: string
 *           description: Confirmación de la nueva contraseña.
 *           example: "ClaveNueva456"
 * 
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT temporal para validación.
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión en el sistema.
 *     description: Recibe las credenciales del usuario y devuelve un token JWT temporal para autenticación.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve un token JWT de validación temporal.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Datos inválidos (faltantes o mal formateados).
 *       401:
 *         description: Credenciales incorrectas.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario.
 *     description: Crea una nueva cuenta de usuario en el sistema con el rol indicado.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Datos inválidos (faltantes o con formato incorrecto).
 */

/**
 * @swagger
 * /auth/set-password:
 *   patch:
 *     summary: Cambiar la contraseña de un usuario.
 *     description: Requiere la contraseña actual y la nueva. El usuario debe estar autenticado.  
 *                  Al actualizar la contraseña, se devuelve un nuevo token JWT temporal.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetPassword'
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente. Devuelve un token JWT de validación temporal.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Datos inválidos o contraseñas no coinciden.
 *       401:
 *         description: No autorizado o token inválido.
 */
