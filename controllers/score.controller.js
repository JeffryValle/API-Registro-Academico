import { 
    checkCursoByDocente,
    checkCursoById, 
    checkCursoByPeriodo, 
    existeCurso,  
    modelCantidadCursosByDocente, 
    modelExisteNota, 
    modelGetCursosByDocente, 
    modelGetScoreByCurso, 
    modelGetStudentsByCursoPeriodo,
    modelInscribirDocente,
    modelInsertarCalificacion,
    modelUpdateNota
} from "../models/score.model.js";
import { v4 as uuidv4} from 'uuid'

export const getScoreByCurso = async (req, res) => {

    const { nombre, curso, periodo } = req.body;

    try {
        console.log( nombre, curso, periodo )
        const checkCurso = await checkCursoById( curso, nombre, periodo );

        if ( checkCurso.length === 0 ) {
            res.status(404).json({ message: "Curso no encontrado" });
            return;
        }

        const checkScore = await modelGetScoreByCurso( curso, periodo );

        if ( checkScore.length === 0 ) {
            res.status(404).json({ message: "No se encontraron calificaciones para el curso" });
            return;
        }

        res.status(200).json({ 
            message: "Calificaciones obtenidas correctamente", 
            data: checkScore 
        });

    } catch (error) {

        res.status(500).json({ message: "Sucedió un error, verificar", error: error.message });
        return;
        
    }

}

export const getCursosByDocente = async (req, res) => {

    const { id } = req.params;

    try {
        
        console.log(id)
        // llamar al modelo para implementar la lógica de obtener cursos por docente
        const cursos = await modelGetCursosByDocente( id );
        console.log(cursos)

        if (cursos.length === 0) {
            res.status(404).json({ message: "El docente no se ha inscrito en ningún curso" });
            return;
        }

        res.status(200).json({ 
            message: "Cursos obtenidos correctamente", 
            data: cursos 
        });


    } catch (error) {
        
        res.status(500).json({ message: "Sucedió un error, verificar", error: error.message });
        return;

    }

}

export const getStudentsByCurso = async (req, res) => {

    const { nombre, curso, periodo } = req.body;

    try {

        const students = await checkCursoByDocente( nombre )

        if ( students.length === 0 ) {
            res.status(404).json({ message: "No se encontraron estudiantes inscritos en el curso" });
            return;
        }

        res.status(200).json({ 
            data: students 
        });

    } catch (error) {

        res.status(500).json({ message: "Sucedió un error, verificar", error: error.message });
        return;
        
    }
}

export const inscribirDocente = async ( req, res ) => {

    const { nombre, curso, periodo } = req.body;

    try {

        if ( periodo < 1 || periodo > 6 ) {
            res.status(400).json({ message: "El periodo academico debe ser un número entre 1 y 6" });
            return;
        }

        const cantidad = await modelCantidadCursosByDocente( nombre, periodo );
        if ( cantidad.total >= 3 ) {
            res.status(400).json({ message: "El docente ya superó el límite de inscripciones a cursos en ese periodo" });
            return;
        }

        const checkCurso = await checkCursoByPeriodo( curso, nombre, periodo );

        if ( !checkCurso ) {
            res.status(400).json({ message: "El docente ya está inscrito en este curso en este periodo" });
            return;
        }

        const cursoExiste = await existeCurso( curso );

        if ( !cursoExiste ) {
            res.status(404).json({ message: "No existe el curso al cual desea inscribirse" });
            return;
        }

        const ingresado = await modelInscribirDocente( nombre, curso, periodo );

        if( !ingresado ) {
            res.status(500).json({ message: "No se pudo inscribir al docente en el curso" });
            return;
        }
        
        res.status(201).json({ 
            message: "Docente inscrito correctamente en el curso", 
            data: { nombre, curso, periodo } 
        });
        
    } catch (error) {
     
        res.status(500).json({ message: "Sucedió un error, verificar", error: error.message });
        return;
        
    }
}

export const postearNotas = async ( req, res ) => {

    const { curso, nombre, nota, periodo, parcial } = req.body;
    // {
    //     "curso": "Arte Moderno",
    //     "nombre": "Pablo Diaz",
    //     "nota": 99.9,
    //     "periodo": 1 ,
    //     "parcial": 2 
    // }

    try {

        const cursoExiste = await existeCurso( curso );

        if ( !cursoExiste ) {
            res.status(404).json({ message: "No existe el curso al cual desea inscribirse" });
            return;
        }

        const students = await modelGetStudentsByCursoPeriodo( curso, nombre, periodo );

        if ( students.length === 0 ) {
            res.status(404).json({ message: "No se encontraron estudiantes inscritos en el curso o inscritos en ese periodo" });
            return;
        }

        const existeNota = await modelExisteNota( curso, nombre, periodo, parcial );

        if ( existeNota["ya_existe"] === 1 ) {
            res.status( 400 ).json({ message: "Ya se ha insertado esta calificacion previamente" });
            return;
        }
    
        const matricula = students[0].Matricula;

        const insertado = await modelInsertarCalificacion( matricula, nota, parcial );

        if ( !insertado ) { 
            res.status( 422 ).json({ message: "No se pudo insertar la calificación" });
            return
        }

        res.status( 200 ).json({ 
            message: "Calificación Insertada al Sistema",
            data: {
                curso, nombre, nota, periodo, parcial
            }
        });
            return
        
    } catch (error) {
        
        res.status( 500 ).json({ message: "Sucedió un error, verificar", error: error.message })

    }
}

export const actualizarNotas = async ( req, res ) => {

    const { curso, nombre, nota, periodo, parcial } = req.body;

    try {

        const cursoExiste = await existeCurso( curso );

        if ( !cursoExiste ) {
            res.status(404).json({ message: "No existe el curso al cual desea inscribirse" });
            return;
        }

        const students = await modelGetStudentsByCursoPeriodo( curso, nombre, periodo );

        if ( students.length === 0 ) {
            res.status(404).json({ message: "No se encontraron estudiantes inscritos en el curso o inscritos en ese periodo" });
            return;
        }
    
        const matricula = await students[0].Matricula;

        console.log( matricula, nota, parcial )
        const insertado = await modelUpdateNota( matricula, nota, parcial );

        if ( !insertado ) { 
            res.status( 422 ).json({ message: "No se pudo insertar la calificación" });
            return
        }

        res.status( 200 ).json({ 
            message: "Calificación Insertada al Sistema",
            data: {
                curso, nombre, nota, periodo, parcial 
            }
        });
            return
        
    } catch (error) {
        
        res.status( 500 ).json({ message: "Sucedió un error, verificar", error: error.message })

    }

}