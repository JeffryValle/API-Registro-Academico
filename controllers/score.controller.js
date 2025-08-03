import { 
    checkCursoById, 
    checkCursoByPeriodo, 
    existeCurso,  
    modelCantidadCursosByDocente, 
    modelExisteNota, 
    modelGetCursosByDocente, 
    modelGetScoreByCurso, 
    modelGetStudentsByCurso,
    modelGetStudentsByCursoPeriodo,
    modelInscribirDocente,
    modelInsertarCalificacion
} from "../models/score.model.js";
import { v4 as uuidv4} from 'uuid'

export const getScoreByCurso = async (req, res) => {

    const { curso, cuenta_id } = req.body;

    try {

        const checkCurso = await checkCursoById( curso, cuenta_id );

        if ( checkCurso.length === 0 ) {
            res.status(404).json({ message: "Curso no encontrado o no pertenece al docente" });
            return;
        }

        const checkScore = await modelGetScoreByCurso( curso );

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
        
        // llamar al modelo para implementar la lógica de obtener cursos por docente
        const cursos = await modelGetCursosByDocente( id );

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

    const { cuenta_id, curso, periodo } = req.body;

    try {
        
        const checkCurso = await checkCursoById( curso, cuenta_id );
        if ( checkCurso.length === 0 ) {
            res.status(404).json({ message: "Curso no encontrado o no pertenece al docente" });
            return;
        }

        const students = await modelGetStudentsByCurso( curso, periodo );

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

    const { cuenta_id, curso, periodo } = req.body;

    const matricula = uuidv4();

    try {

        if ( periodo < 1 || periodo > 3 ) {
            res.status(400).json({ message: "El periodo academico debe ser un número entre 1 y 3" });
            return;
        }

        const cantidad = await modelCantidadCursosByDocente( cuenta_id, periodo );
        if ( cantidad.total >= 3 ) {
            res.status(400).json({ message: "El docente ya superó el límite de inscripciones a cursos en ese periodo" });
            return;
        }

        const checkCurso = await checkCursoByPeriodo( curso, cuenta_id, periodo );

        if ( checkCurso.length > 0 ) {
            res.status(400).json({ message: "El docente ya está inscrito en este curso en este periodo" });
            return;
        }

        const cursoExiste = await existeCurso( curso );

        if ( !cursoExiste ) {
            res.status(404).json({ message: "No existe el curso al cual desea inscribirse" });
            return;
        }

        const ingresado = await modelInscribirDocente(matricula, cuenta_id, curso, periodo);

        if( !ingresado ) {
            res.status(500).json({ message: "No se pudo inscribir al docente en el curso" });
            return;
        }
        
        res.status(201).json({ 
            message: "Docente inscrito correctamente en el curso", 
            data: { cuenta_id, curso, periodo } 
        });
        
    } catch (error) {
     
        res.status(500).json({ message: "Sucedió un error, verificar", error: error.message });
        return;
        
    }
}

export const postearNotas = async ( req, res ) => {

    const { curso, cuenta_id, nota, periodo_id, subperiodo_id: parcial } = req.body;

    try {

        const cursoExiste = await existeCurso( curso );

        if ( !cursoExiste ) {
            res.status(404).json({ message: "No existe el curso al cual desea inscribirse" });
            return;
        }

        const students = await modelGetStudentsByCursoPeriodo( curso, cuenta_id,  periodo_id );

        if ( students.length === 0 ) {
            res.status(404).json({ message: "No se encontraron estudiantes inscritos en el curso o inscritos en ese periodo" });
            return;
        }

        const existeNota = await modelExisteNota( curso, cuenta_id, periodo_id, parcial );

        if ( existeNota ) {
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
                curso, cuenta_id, nota, periodo_id, subperiodo_id: parcial 
            }
        });
            return
        
    } catch (error) {
        
        res.status( 500 ).json({ message: "Sucedió un error, verificar", error: error.message })

    }
}

export const actualizarNotas = async ( req, res ) => {

    const { curso, cuenta_id, nota, periodo_id, subperiodo_id: parcial } = req.body;

    try {

        const cursoExiste = await existeCurso( curso );

        if ( !cursoExiste ) {
            res.status(404).json({ message: "No existe el curso al cual desea inscribirse" });
            return;
        }

        const students = await modelGetStudentsByCursoPeriodo( curso, cuenta_id,  periodo_id );

        if ( students.length === 0 ) {
            res.status(404).json({ message: "No se encontraron estudiantes inscritos en el curso o inscritos en ese periodo" });
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
                curso, cuenta_id, nota, periodo_id, subperiodo_id: parcial 
            }
        });
            return
        
    } catch (error) {
        
        res.status( 500 ).json({ message: "Sucedió un error, verificar", error: error.message })

    }

}