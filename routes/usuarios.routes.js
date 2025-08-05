import { Router } from 'express'

import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

import {
    getAll
} from '../controllers/usuarios.controller.js'

const usuariosRouter = Router()

usuariosRouter.get('/', [isAuth, isAdmin], getAll)


export default usuariosRouter