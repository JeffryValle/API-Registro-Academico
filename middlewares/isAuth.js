import jwt from 'jsonwebtoken';


export const isAuth = (req, res, next) => {

    const { authorization } = req.headers

    console.log('Authorization', authorization);

    if ( !authorization ) {
        res.status(401).json({
            success: false,
            message: 'Debe iniciar sesión para acceder a este recurso',
        })
        return
    }

    const token = authorization.split(' ')[1]

    try {

        const { role, id } = jwt.verify(token, process.env.JWT_SECRET)

        req.params.role = role
        req.params.id = id

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: 'Debe iniciar sesión para acceder a este recurso',
        })
        return

    }

}