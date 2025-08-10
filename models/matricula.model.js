import pool from '../config/database.js';

export const verifyAdmin = async ( id ) => {

    const query = `SELECT 
                        r.nombre AS Rol 
                    FROM usuarios AS u
                    INNER JOIN roles AS r ON r.rol_id = u.rol_id
                    WHERE u.cuenta_id = UUID_TO_BIN(?) ;`;

    const [ rows ] = await pool.query( query, [ id ] );

    return rows[0] 
}   

export const getMatriculas = async () => {

    const query = `SELECT 
                    BIN_TO_UUID(m.matricula_id) AS Matricula,
                    u.nombre AS Nombre,
                    BIN_TO_UUID(u.cuenta_id) AS Cuenta,
                    c.nombre AS Curso,
                    BIN_TO_UUID(c.curso_id) AS CodigoCurso
                FROM matriculas AS m
                INNER JOIN usuarios AS u ON u.cuenta_id = m.cuenta_id
                INNER JOIN cursos AS c ON c.curso_id = m.curso_id;`;

    const [ results ] = await pool.query( query );
    
    return results;
}

export const getEstudiantesByCurso = async ( id ) => {

    const query = `SELECT 
                    BIN_TO_UUID(c.curso_id) as CodigoCurso,
                    BIN_TO_UUID(u.cuenta_id) AS Cuenta,
                    c.nombre AS Curso,
                    u.nombre AS Nombre,
                    u.correo as Correo
                FROM matriculas AS m
                INNER JOIN usuarios AS u ON u.cuenta_id = m.cuenta_id
                INNER JOIN cursos AS c ON c.curso_id = m.curso_id
                WHERE m.curso_id = UUID_TO_BIN('494a5828-760c-11f0-8878-c2c469bd52ea');`;

    const [ results ] = await pool.query( query, [ id ] );
    return results;
}

export const cursosByStudent = async ( cuenta ) => {

    const query = `SELECT
                    BIN_TO_UUID(u.cuenta_id) AS Cuenta,
                    u.nombre AS Estudiante,
                    BIN_TO_UUID(c.curso_id) as CodigoCurso,
                    c.nombre AS Curso,
                    c.cupos AS Cupos,
                    m.fecha_Creado AS FechaInscripcion
                FROM matriculas AS m
                INNER JOIN usuarios AS u ON u.cuenta_id = m.cuenta_id
                INNER JOIN cursos AS c ON c.curso_id = m.curso_id
                WHERE u.cuenta_id = UUID_TO_BIN( ? );`;

    const [ registros ] = await pool.query( query, [ cuenta ] );
    return registros;
}

export const validateMatricula = async ( cuenta, curso, periodo ) => {

    const query = `SELECT 
                    BIN_TO_UUID(m.matricula_id) AS Matricula,
                    BIN_TO_UUID(m.cuenta_id) AS Cuenta,
                    c.nombre AS Curso,
                    m.fecha_creado AS FechaInscripcion,
                    m.periodo_id as Periodo
                FROM matriculas AS m
                INNER JOIN cursos AS c on c.curso_id = m.curso_id
                WHERE 
					m.cuenta_id = UUID_TO_BIN(?) 
                    AND c.nombre = ? 
                    AND m.periodo_id = ? ;`

    const [ result ] = await pool.query( query, [ cuenta, curso, periodo ] );

    return result[0];
}

export const cantidadMatriculas = async ( cuenta ) => {

    const query = `SELECT * FROM matriculas WHERE cuenta_id = UUID_TO_BIN( ? ) ;`;

    const [ rows ] = await pool.query( query, [ cuenta ] );

    return rows;
}

export const existeCupo = async ( curso ) => {

    const query = `SELECT 
                    BIN_TO_UUID(c.curso_id) as CodigoCurso,
                    c.nombre AS Curso,
                    c.cupos AS Cupos,
                    COUNT(m.cuenta_id) AS Inscritos,
                    (c.cupos - COUNT(m.cuenta_id)) AS Disponibles
                FROM cursos c
                LEFT JOIN matriculas m ON m.curso_id = c.curso_id
                WHERE c.nombre = ?
                GROUP BY c.curso_id, c.nombre, c.cupos ;`;

    const [ result ] = await pool.query( query, [ curso ] );

    return result[0];
}

export const crearMatriculaModel = async ( id, cuenta, curso, periodo ) => {

    let cnx;

    try {

        cnx = await pool.getConnection();
        
        await cnx.beginTransaction();

        const query = `INSERT INTO matriculas (matricula_id, cuenta_id, curso_id, periodo_id)
        VALUES ( UUID_TO_BIN( ? ), UUID_TO_BIN( ? ), UUID_TO_BIN((SELECT BIN_TO_UUID(curso_id) FROM cursos WHERE nombre = ? )), ?);`;

        await cnx.execute( query, [ id, cuenta, curso, periodo ] );

        await cnx.commit();
        return true;

    } catch (error) {

        await cnx.rollback();
        throw new Error( error.message );

    } finally {
        
        cnx.release();
        
    }
}