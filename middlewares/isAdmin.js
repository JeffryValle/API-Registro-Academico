import { verifyAdmin } from "../models/matricula.model.js";


export const isAdmin = async (req, res, next) => {

    const { role, id } = req.params

    try {
        
        const rol = await verifyAdmin( id );

        if (role !== rol) {
            res.status(401).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador.',
            });
            return
        }

        next();

    } catch (error) {
        // console.error('Error al verificar rol de administrador:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
        });
    }

}