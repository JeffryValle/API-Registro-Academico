// import { validateUsuario } from '../schemas/movie.schema.js'
import { getAllUsuarios } from '../models/usuarios.model.js'
import { v4 as uuidv4 } from 'uuid';

export const getAll = async (req, res) => {

    try{
        const usuarios = await getAllUsuarios()

        res.json(usuarios) 
    }
    catch (error){
        res.status(400).json({
            message: 'Error al obtener los usuarios' + error.message
        })
    }
}