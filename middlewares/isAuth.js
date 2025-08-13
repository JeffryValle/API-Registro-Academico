import jwt from 'jsonwebtoken';


export const isAuth = (req, res, next) => {

    const { authorization } = req.headers

    if ( !authorization ) {
        res.status(401).json({
            success: false,
            message: 'Debe iniciar sesión para acceder',
        })
        return
    }

    const token = authorization.split(' ')[1]

    try {

        const payload = jwt.verify( token, process.env.SECRET_JWT_SEED );

        // Verificar el tiempo de expiración del token
        // Date.now() devuelve en milisegundos
        // payload.exp devuelve en segundos
        if ( Date.now() >= payload.exp * 1000 ) {
            res.status(401).json({
                success: false,
                message: 'Su token ha expirado. Por favor, inicie sesión nuevamente.',
            })
            return
        } 

        const { cuenta_id, correo, rol } = payload;


        if (!cuenta_id || !correo || !rol) {

            res.status(401).json({
                result: false,
                message: 'Este token no es válido',
            })
            return
        };

        req.cuenta_id = cuenta_id
        req.rol = rol

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: 'Token inválido o expirado',
            error: error.message
        })
        return
    }
}