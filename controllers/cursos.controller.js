import {

    createCurso,
    findByNombre,
    getAllCursos,
    getCursoByID,
    updateCurso,
    deleteCurso
}   from '../models/cursos.model.js';

export const listCursos = async (req, res) => {

    try{

        const cursos = await getAllCursos();
        
        if (!cursos || cursos.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No existen cursos registrados"
            });
        }

        res.json(cursos);
    }

    catch(error){
        res.status(500).json({message: "Error interno del servidor"}); 
    }
}


export const getCursosbyName = async (req, res) => {

    const { nombre } = req.params;

    try {

        const curso = await findByNombre(nombre);

        if (!curso || curso.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }

        res.json(curso);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" , error: error.message });
    }   

}

export const crearCurso = async (req, res) => {

    try{

        const { nombre, cupos }= req.body; 

        if(!nombre || !cupos){
            return res.status(400).json({
                success: false,
                message: "Todos los datos son requeridos"
            });
        }

        

    }

    catch(error){
        res.status(500).json({message: "Error interno del servidor", error: error.message}); 
    }

}