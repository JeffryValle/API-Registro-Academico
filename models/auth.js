import pool from '../config/database.js'

export const loginUser = async (user) => {

    // obtener el registro del usuario
    const query = `SELECT 
                        cuenta_id as cuenta_id,  
                        nombre,
                        correo,
                        telefono,
                        password_hash,
                        cambio_password,
                        fecha_creado,
                        rol_id  
                        FROM usuarios WHERE correo = ?;`

    const [results] = await pool.query(query, [user])

    return results[0]

}

export const register = async (user) => {

    const query = `INSERT INTO usuarios (cuenta_id, 
					nombre, 
                    correo, 
                    telefono, 
                    password_hash, 
                    cambio_password, 
                    rol_id) 
                    VALUES ( UUID_TO_BIN(?), ?, ?, ?, ?,1, ?);`

    const [rows] = await pool.query(query, [...user])

    return rows

}

export const updatePassword = async (id, password_hash) => {

    const query = `UPDATE usuarios SET password_hash = ?,
             cambio_password = 0 WHERE cuenta_id = ?;`


    const [rows] = await pool.query(query, [password_hash, id])

    return rows

}