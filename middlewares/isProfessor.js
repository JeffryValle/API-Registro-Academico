import { verifyProfessor } from "../models/score.model.js";

export const isProfessor = async (req, res, next) => { 

    const { cuenta_id, rol } = req

    try {
        
        const esProfessor = await verifyProfessor( cuenta_id ); 

        if ( esProfessor["rol"] !== rol ) {
            res.status(401).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de docente.',
            });
            return
        }

        console.log( esProfessor );

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
        });
    }

}