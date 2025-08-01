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

        const { cuenta_id, password, rol } = jwt.verify(token, process.env.SECRET_JWT_SEED)

        console.log( cuenta_id, password, rol );

        if ( !cuenta_id || !password || !rol ) {
            res.status(401).json({
                result: false,
                message: 'Token inválido o incompleto',
            })
            return
        }

        req.cuenta_id = cuenta_id
        req.password = password
        req.rol = rol

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: 'Token inválido o expirado',
        })
        return
    }
}