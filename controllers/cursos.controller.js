import {

    createCurso,
    findByNombre,
    getAllCursos,
    getCursoByID,
    updateCurso,
    deleteCurso
}   from '../models/cursos.model.js';

import { cursoSchema,
    cursoUpdateSchema
 } from "../schemas/curso.schema.js";

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
        res.status(500).json({message: "Error interno del servidor", error: error.message}); 
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

            const parsed = cursoSchema.safeParse(req.body);
        if (!parsed.success) {
        return res.status(400).json({
            success: false,
            errors: parsed.error.errors.map(err => err.message),
        });
        }

        const { nombre, cupos } = parsed.data;


        // Validar unicidad
        const existe = await findByNombre(nombre);
        if(existe.length > 0){
            return res.status(400).json({
                success: false,
                message: "El curso ya existe"
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
        

        // Verificar si el curso existe
        const cursoExistente = await getCursoByID(curso_id);
        if (!cursoExistente) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado"
            });
        }    

         const parsed = cursoUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors.map(err => err.message),
      });
    }

    const { nombre, cupos } = parsed.data;

    // validar que Nombre sea único
    if (nombre) {
      const existe = await findByNombre(nombre);
      if (existe.length > 0 && existe[0].curso_id !== curso_id) {
        return res.status(400).json({
          success: false,
          message: "El nombre del curso ya existe",
        });
      }
    }

    // Actualizar curso
    await updateCurso(id, { nombre, cupos });
    res.status(200).json({
      success: true,
      message: "Curso actualizado exitosamente",
    });


    }

    catch(error){
        res.status(500).json({
            message: "Error interno del servidor", 
            error: error.message
        }); 
    }
}


export const eliminarCurso = async (req, res) => {

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
