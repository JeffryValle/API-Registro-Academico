import bcrypt from 'bcrypt';
import { 
    checkCorreo, 
    checkCuenta, 
    insertarUser 
} from "../models/auth.model.js";
import { setID } from '../helpers/id.js';

export const register = async ( req, res ) => {

    const { nombre, correo, telefono, password, rol } = req.body;
    const data = req.body;

    try {

        // TODO: Validar que los campos vengan llenos
        if( !nombre || !correo || !telefono || !password || !rol ){
            res
                .status( 400 )
                .json({ message: "Debe rellenar todos los campos" })
            return
        }

        // TODO: Validar que la cuenta sea unica
        const cuenta = setID(); 
        const existeUser = await checkCuenta( cuenta );

        if ( existeUser ) {
            res
                .status( 400 )
                .json({ message: "Este usuario ya existe" })
            return
        }
        // TODO: Validar que el correo sea único

        const existeCorreo = await checkCorreo( correo );

        if ( existeCorreo ) {
            res
                .status( 400 )
                .json({ message: "Este correo ya existe" })
            return
        }

        const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));

        const user = await insertarUser({ ...data, cuenta, passwordHash });

        delete data.password;
        delete data.passwordHash;

        console.log( data )

        res
            .status( 200 )
            .json({ message: "Creado Exitosamente", data: data })
        return
    
    } catch ( err ) {

        res
            .status( 500 )
            .json( { message: "Ocurrió un error", error: err.message} )
    }
 
}