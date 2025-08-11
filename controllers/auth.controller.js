import jwt from 'jsonwebtoken' // para generar el token
import bcrypt from 'bcrypt'
import { loginUser, register, updatePassword} from '../models/auth.js' // importar el modelo de autenticación
import {getRoleIdByName} from '../utils/auth.utils.js' // importar las utilidades de autenticación
// import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid';
import { validateRegister, validateLogin, validateSetPassword } from '../schemas/auth.schema.js';

export const login = async (req, res) => {

    const { user, password } = req.body

    const data = await loginUser(user)

    console.log(data)

    // validar que la contraseña sea correcta
    if (!await bcrypt.compare(password, data.password_hash)) {
        res.status(401).json({
            success: false,
            message: 'Usuario o contraseña incorrectos'
        })

        return
    }

    // validar si no debe cambiar la contraseña
    if (data.cambio_password) {
        // obligarlo a cambiar de contraseña
        const tokenTemporal = jwt.sign({
            id: data.cuenta_id,
            password: data.password_hash,
        }, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        })

        res.json({
            success: true,
            message: 'Debe cambiar su contraseña',
            data: {
                token: tokenTemporal,
            }
        })

        return
    }


    // puedo retornar la información del usuario

    const payload = {
        cuenta_id: data.cuenta_id,
        correo: data.correo,
        rol: data.rol_nombre,

    }

    console.log(payload)

    const token = jwt.sign(payload, process.env.SECRET_JWT_SEED, {
        algorithm: 'HS256', // Sha2
        expiresIn: '12h'
    })

    delete data.password_hash // eliminar la contraseña del objeto de datos

    res.status(200).json({
        success: true,
        message: 'Usuario autenticado correctamente',
        data: data,
        token
    })


}



export const createUser = async (req, res) => {

    // const { name, email, phone, password, role } = req.body
    const data = req.body;

    const { success, error} = validateRegister(data)

    if (!success) {
        res.status(400).json(error)
    }

    const rolId = await getRoleIdByName(data.role)

    const id = uuidv4()

    //generar una clave
    //TODO: generar una clave aleatoria
    const password_hash = await bcrypt.hash( data.password, Number( process.env.SALT ))

    try {
        const result = await register([id, data.name, data.email, data.phone, password_hash, rolId])

        res.status(201).json({
            success: true,
            message: 'Usuario creado correctamente',
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        })
    }
}


export const setPassword = async (req, res) => {

    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const
        {
            old_password,
            new_password,
            confirm_password
        } = req.body

    try {
        const { id, password } = jwt.verify(token, process.env.SECRET_JWT_SEED)

        if (!await bcrypt.compare(old_password, password)) {
            res.status(401).json({
                success: false,
                message: 'La contraseña anterior no es correcta',
            })

            return
        }

        // validar que las contraseñas nuevas coincidan
        if (new_password !== confirm_password) {
            res.status(400).json({
                success: false,
                message: 'Las contraseñas nueva y de confirmación no coinciden',
            })

            return
        }

        const passwordHash = await bcrypt.hash(new_password, 10)

        await updatePassword(id, passwordHash)


        res.status(200).json({
            success: true,
            message: 'Contraseña actualizada correctamente'
        })
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Debe iniciar sesión para cambiar la contraseña',
            error: error.message
        })
        return
    }
}