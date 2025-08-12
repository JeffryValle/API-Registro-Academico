import pool from '../config/database.js'

//la siguiente funcion nos ayudara a obtener el id de un rol a partir de su nombre
export const getRoleIdByName = async (roleName) => {
    const query = 'SELECT rol_id FROM roles WHERE nombre = ? LIMIT 1; '
    const [rows] = await pool.query(query, [roleName])
    if (rows.length === 0) throw new Error(`Rol '${roleName}' no encontrado`)
    return rows[0].rol_id
}