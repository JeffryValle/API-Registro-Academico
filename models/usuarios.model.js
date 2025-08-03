import pool from '../config/database.js';


export const getAllUsuarios = async ()=>{
    const query = ``

    const [results] = await pool.query(query);

    return results
}