import pool from '../config/database.js'

export const loginUser = async (user) => {

    // obtener el registro del usuario
    const query = `SELECT 
                        BIN_TO_UUID(u.cuenta_id) AS cuenta_id,  
                        u.nombre,
                        u.correo,
                        u.telefono,
                        u.password_hash,
                        u.cambio_password,
                        u.fecha_creado,
                        u.rol_id,
                        r.nombre AS rol_nombre
                    FROM usuarios AS u
                    INNER JOIN roles AS r ON r.rol_id = u.rol_id
                    WHERE u.correo = ?;`

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
             cambio_password = 0 WHERE cuenta_id = UUID_TO_BIN(?);`


    const [rows] = await pool.query(query, [password_hash, id])

    return rows

}