import { getMatriculas } from "../models/matricula.model.js"


export const getAllMatriculas = async (req, res) => {

    try {

        const matriculas = await getMatriculas();

        console.log('Matriculas --', matriculas);

        if (matriculas.length === 0) {
            return res.status(404).json({ message: "No hay matriculas existentes" });
        }

        res.status(200).json({
            success: true,
            message: "Matriculas obtenidas correctamente",
            data: matriculas
        });

    } catch (error) {

        res.status(500).json({ message: "Error interno del servidor" , error: error.message });

    }

}