import pool from '../config/database.js';

export const verifyAdmin = async ( id ) => {

    const query = `SELECT 
                        r.nombre AS Rol 
                    FROM usuarios AS u
                    INNER JOIN roles AS r ON r.rol_id = u.rol_id
                    WHERE u.cuenta_id = ? ;`;

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

export const getEstudiantesByCurso = async ( id ) => {

    const query = `SELECT 
                    c.curso_id as CodigoCurso,
                    c.nombre AS Curso,
                    u.nombre AS Nombre,
                    u.cuenta_id AS Cuenta,
                    u.correo as Correo
                FROM matriculas AS m
                INNER JOIN usuarios AS u ON u.cuenta_id = m.usuario_id
                INNER JOIN cursos AS c ON c.curso_id = m.curso_id
                WHERE c.curso_id = ? ;`;

    const [ results ] = await pool.query( query, [ id ] );
    return results;
}

export const cursosByStudent = async ( cuenta ) => {

    const query = `SELECT
                    u.cuenta_id AS Cuenta,
                    u.nombre AS Estudiante,
                    c.curso_id as CodigoCurso,
                    c.nombre AS Curso,
                    c.cupos AS Cupos,
                    m.fecha_Creado AS FechaInscripcion
                FROM matriculas AS m
                INNER JOIN usuarios AS u ON u.cuenta_id = m.usuario_id
                INNER JOIN cursos AS c ON c.curso_id = m.curso_id
                WHERE u.cuenta_id = ? ;`;

    const [ registros ] = await pool.query( query, [ cuenta ] );
    return registros;
}

export const validateMatricula = async ( usuario, curso ) => {

    const query = `SELECT 
                    m.matricula_id AS Matricula,
                    m.usuario_id AS Cuenta,
                    c.nombre AS Curso,
                    m.fecha_creado AS FechaInscripcion
                FROM matriculas AS m
                INNER JOIN cursos AS c on c.curso_id = m.curso_id
                WHERE m.usuario_id = ? AND c.nombre = ? ;`

    const [ result ] = await pool.query( query, [ usuario, curso ] );

    return result[0];
}

export const cantidadMatriculas = async ( id ) => {

    const query = `SELECT * FROM matriculas WHERE usuario_id = ? ;`;

    const [ rows ] = await pool.query( query, [ id ] );

    return rows;
}

export const existeCupo = async ( curso ) => {

    const query = `SELECT 
                    c.curso_id AS CodigoCurso,
                    c.nombre AS Curso,
                    c.cupos AS Cupos,
                    COUNT(m.usuario_id) AS Inscritos,
                    (c.cupos - COUNT(m.usuario_id)) AS Disponibles
                FROM cursos c
                LEFT JOIN matriculas m ON m.curso_id = c.curso_id
                WHERE c.nombre = ?
                GROUP BY c.curso_id, c.nombre, c.cupos ;`;

    const [ result ] = await pool.query( query, [ curso ] );

    return result[0];
}

export const crearMatriculaModel = async ( id, usuario, curso ) => {

    let cnx;

    try {

        cnx = await pool.getConnection();
        
        await cnx.beginTransaction();

        const query = `INSERT INTO matriculas ( matricula_id, usuario_id, curso_id)
                        VALUES ( ?, ?,
                            (SELECT curso_id FROM cursos WHERE nombre = ? )
                        );`;

        await cnx.execute( query, [ id, usuario, curso ] );

        await cnx.commit();
        return true;

    } catch (error) {

        await cnx.rollback();
        throw new Error( error.message );

    } finally {
        
        cnx.release();
        
    }
}