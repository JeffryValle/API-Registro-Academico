import pool from "../config/database.js";

export const checkCuenta = async ( cuenta ) => {

    const query = `select cuenta_id from usuarios where cuenta_id = ?;`;

    const [ rows ] = await pool.query( query, [ cuenta ] );
    return rows[0]
}

export const checkCorreo = async ( correo ) => {

    const query = `select correo from usuarios where correo = ?;`;

    const [ rows ] = await pool.query( query, [ correo ] );
    return rows[0]
}

export const insertarUser = async ( data ) => {

    const { cuenta, nombre, correo, telefono, passwordHash, rol } = data

    let cnx;
    try {

        cnx = await pool.getConnection();

        await cnx.beginTransaction();

        const query = `INSERT INTO usuarios (cuenta_id, nombre, correo, telefono, password_hash, rol_id) 
                        VALUES (?, ?, ?, ?, ?, 
                        (select rol_id from roles where nombre = ?));`;

        await cnx.execute( query, [ cuenta, nombre, correo, telefono, passwordHash, rol ]);

        await cnx.commit();

        return true;
        
    } catch (error) {
        
        await cnx.rollback();

    }   finally {

        await cnx.release();

    }
}