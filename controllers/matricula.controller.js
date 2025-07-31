import { 
    cursosByStudent,
    getEstudiantesByCurso, 
    getMatriculas 
} from "../models/matricula.model.js"

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
        console.log( usuarios );

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

    console.log( cuenta );

    try {

        const cursos = await cursosByStudent( cuenta );

    } catch (error) {
        
    }

}