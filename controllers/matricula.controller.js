import { 
    cantidadMatriculas,
    crearMatriculaModel,
    cursosByStudent,
    existeCupo,
    getEstudiantesByCurso, 
    getMatriculas
} from "../models/matricula.model.js"
import { v4 as uuidv4 } from 'uuid';
import { validateMatricula } from "../schemas/matricula.schema.js";


//? Ver todas las matriculas
export const getAllMatriculas = async (req, res) => {

    try {

        const matriculas = await getMatriculas();

        if (matriculas.length === 0) {
            return res.status( 404 ).json({ message: "No hay matriculas existentes" });
        }

        res.status( 200 ).json({
            success: true,
            message: "Matriculas obtenidas correctamente",
            data: matriculas
        });

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" , error: error.message });
        return
    }
}

//? Ver estudiantes que pertenecen a un curso
export const getStudentsByCurso = async (req, res) => {

    const { id } = req.params;

    try {
        
        const usuarios = await getEstudiantesByCurso( id );

        if ( usuarios.length === 0) {
            res.status( 404 ).json( { message: "No existen estudiantes matriculados en este curso" } );
            return
        }

        res.status( 200 ).json( { message: "OK", data: usuarios } );
        return

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" , error: error.message });
        return
    }
}

//? Ver cursos en los que esta inscrito un estudiante
export const getCursoByStudent = async ( req, res ) => {

    const { id: cuenta } = req.params;

    try {

        const cursos = await cursosByStudent( cuenta );

        if (cursos.length === 0) {
            res.status( 404 ).json({ message: "No existen cursos inscritos para este estudiante" });
            return
        }

        res.status( 200 ).json({
            success: true,
            message: "Cursos obtenidos correctamente",
            data: cursos
        });

    } catch (error) {

        res.status(500).json({ message: "Error interno del servidor" , error: error.message });
        return
        
    }
}

//? Matricularse en un curso
export const crearMatricula = async (req, res) => {

    const data = req.body;

    const { success, error, data:safeData } = validateMatricula( data ); 

    if ( !success ) {
        res.status( 400 ).json({ message: error });
        return 
    }

    const { cuenta, curso, periodo } = safeData;
 
    const id = uuidv4();

    try {
        
        const existeMatricula = await validateMatricula( cuenta, curso, periodo );

        if ( existeMatricula ) {
            res.status( 400 ).json({ message: "El estudiante ya está matriculado en este curso" });
            return 
        }

        const matriculas = await cantidadMatriculas( cuenta );

        
        if ( matriculas.length >= 5 ) {
            res.status( 400 ).json({ message: "El estudiante ya está inscrito en 5 cursos, no puede inscribirse en más" });
            return
        }

        const cupoDisponible = await existeCupo( curso );
        
        if ( cupoDisponible["Disponibles"] <= 0 ) {
            res.status( 400 ).json({ message: "No hay cupos disponibles para este curso" });
            return
        }

        const crear = await crearMatriculaModel( id, cuenta, curso, periodo );

        if ( !crear ) {
            res.status( 400 ).json({ message: "Error al crear la matrícula" });
            return
        }

        res.status( 201 ).json({
            success: true,
            message: "Matrícula creada correctamente",
            data: { id, cuenta, curso, periodo }
        });

    } catch (error) {

        res.status(500).json({ message: "Error interno del servidor" , error: error.message });
        return
    }

}