import { verifyAdmin } from "../models/matricula.model.js";


export const isAdmin = async (req, res, next) => { 

    const { cuenta_id, rol } = req

    try {
        
        const esAdmin = await verifyAdmin( cuenta_id ); 
        
        console.log(esAdmin["Rol"] +" = "+ rol)

        if ( esAdmin["Rol"] !== rol ) {
            res.status(401).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador.',
            });
            return
        }

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
        });
    }

}