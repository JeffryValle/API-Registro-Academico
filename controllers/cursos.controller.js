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


        // Validacion de datos
        if(!nombre || !cupos){
            return res.status(400).json({
                success: false,
                message: "Todos los datos son requeridos"
            });
        }

        if (nombre.length < 3 || nombre.length > 50) {
            return res.status(400).json({
                success: false,
                message: "El nombre del curso debe tener entre 3 y 50 caracteres"
            });
        }

        if (nombre.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: "El nombre del curso no puede ser solo espacios en blanco"
            });
        }

        if (cupos === undefined || cupos === null || cupos === '' || isNaN(cupos) || cupos < 1 || cupos > 100) {
            return res.status(400).json({
                success: false,
                message: "Los cupos deben estar entre 1 y 100",
                error: error.message
            });
        }


        // Validar unicidad
        const existe = await findByNombre(nombre);
        if(existe.length > 0){
            return res.status(400).json({
                success: false,
                message: "El curso ya existe",
                error: error.messageerror
            });
        }

        //Crear curso
        await createCurso({ nombre, cupos });
        res.status(201).json({
            success: true,
            message: "Curso creado exitosamente"
        });



    }

    catch(error){
        res.status(500).json({message: "Error interno del servidor", error: error.message}); 
    }

}


export const actualizarCurso = async (req, res) => {

    try{

        const { curso_id } = req.params;
        const { nombre, cupos }= req.body;

        // Validacion de datos
        if(!nombre || !cupos){
            return res.status(400).json({
                success: false,
                message: "Todos los datos son requeridos",
            });
        }

        if (nombre.length < 3 || nombre.length > 50) {
            return res.status(400).json({
                success: false,
                message: "El nombre del curso debe tener entre 3 y 50 caracteres"
            });
        }

        if (nombre.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: "El nombre del curso no puede ser solo espacios en blanco"
            });
        }

        if (cupos === undefined || cupos === null || cupos === '' || isNaN(cupos) || cupos < 1 || cupos > 100) {
            return res.status(400).json({
                success: false,
                message: "Los cupos deben estar entre 1 y 100",
            });
        }

        // Verificar si el curso existe
        const cursoExistente = await getCursoByID(curso_id);
        if (!cursoExistente) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }    


        // Validar unicidad
        if (nombre !== cursoExistente.nombre) {
            const existeNombre = await findByNombre(nombre);
            if (existeNombre.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "El curso ya existe",
                });
            }
        } 
        

        const result = await updateCurso(curso_id, { nombre, cupos });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        res.json({ message: "Curso actualizado correctamente" });

    }

    catch(error){
        res.status(500).json({
            message: "Error interno del servidor", 
            error: error.message
        }); 
    }
}


export const elimarCurso = async (req, res) => {

    try{

        const {id} = req.params; 

        const result = await deleteCurso(id)
        if (result.affectedRows === 0){
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"  
            })
        }

        res.json({
            success: true,
            message: "Curso eliminado exitosamente"
        });

    }

    catch(error){
        res.status(500).json({
            message: "Error interno del servidor", 
            error: error.message
        }); 
    }
}
