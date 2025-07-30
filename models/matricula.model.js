import pool from '../config/database.js';

export const verifyAdmin = async ( id ) => {

    const query = 'SELECT rol FROM usuarios WHERE cuenta_id = ?';

    const [ rows ] = await pool.query( query, [ id ] );

    return rows[0] 
}   

export const getMatriculas = async () => {

    const query = `SELECT 
                    m.matricula_id AS Matricula,
                    u.nombre AS Nombre,
                    u.cuenta_id AS Cuenta,
                    c.nombre AS Curso,
                    c.curso_id AS CodigoCurso
                FROM matriculas AS m
                INNER JOIN usuarios AS u ON u.cuenta_id = m.usuario_id
                INNER JOIN cursos AS c ON c.curso_id = m.curso_id;`;

    const [ results ] = await pool.query( query );

    return results;
}