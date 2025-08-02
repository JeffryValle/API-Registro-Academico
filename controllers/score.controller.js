import { checkCursoById, modelGetScoreByCurso } from "../models/score.model.js";


export const getScoreByCurso = async (req, res) => {

    // {
    //     "curso": "Calculo I",
    //     "cuenta_id": "20212000020",
    // }

    const { curso, cuenta_id } = req.body;

    try {

        const checkCurso = await checkCursoById( curso, cuenta_id );

        if (checkCurso.length === 0) {
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