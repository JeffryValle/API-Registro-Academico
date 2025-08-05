import pool from '../config/database.js';


export const getAllUsuarios = async ()=>{
    const query = `SELECT 
                    u.cuenta_id,
                    u.nombre,
                    u.correo,
                    u.telefono,
                    u.password_hash,
                    u.cambio_password,
                    u.fecha_creado,
                    r.nombre AS rol
                FROM usuarios u
                INNER JOIN roles r ON u.rol_id = r.rol_id;`

    const [results] = await pool.query(query);

    return results
}