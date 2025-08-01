import jwt from 'jsonwebtoken';

dotenv.config();

export const generarJWT = ( payload ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { cuenta, password, rol };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }
        });
    });
}