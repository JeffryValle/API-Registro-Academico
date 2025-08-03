import pool from '../config/database.js';

export const verifyProfessor = async ( cuenta_id ) => {

    const query = `SELECT r.nombre as rol FROM usuarios u
                    inner join roles r on r.rol_id = u.rol_id 
                    WHERE u.cuenta_id = ?`;

    const [ rows ] = await pool.query( query, [ cuenta_id ] );

    return rows[0] 
}   

export const checkCursoById = async ( curso, cuenta_id ) => {

    const query = `select 
                    m.cuenta_id as Cuenta,
                    c.nombre as Curso
                from matriculas m
                inner join cursos c on c.curso_id = m.curso_id
                where m.cuenta_id = ? AND c.nombre = ? ;`;

    const [ rows ] = await pool.query(query, [ cuenta_id, curso ]);

    return rows
}   

export const checkCursoByPeriodo = async ( curso, cuenta_id, periodo_id ) => {
  const query = `
    select 
      m.cuenta_id as Cuenta,
      c.nombre    as Curso,
      m.periodo_id
    from matriculas m
    inner join cursos c 
      on c.curso_id = m.curso_id
    where m.cuenta_id   = ?
      and c.nombre      = ?
      and m.periodo_id  = ?;
  `;

  const [ rows ] = await pool.query(query, [ cuenta_id, curso, periodo_id ]);
  return rows;  
}




export const modelGetScoreByCurso = async ( curso ) => {

    const query = `select
                    u.cuenta_id as Cuenta,
                    u.nombre as Nombre,
                    c.nombre as Curso,
                    max(case when cf.subperiodo_id = 1 then cf.nota end) as Nota1,
                    max(case when cf.subperiodo_id = 2 then cf.nota end) as Nota2,
                    max(case when cf.subperiodo_id = 3 then cf.nota end) as Nota3,
                    round(avg(cf.nota), 1) as Promedio,
                    case when avg(cf.nota) >= 65 then 'APR'
                        else 'RPB'
                    end as Estado
                from matriculas as m
                inner join usuarios as u on u.cuenta_id = m.cuenta_id
                inner join cursos as c on c.curso_id = m.curso_id
                inner join calificaciones as cf on cf.matricula_id = m.matricula_id
                where m.curso_id = (select curso_id from cursos where nombre = ? )
                    group by
                    m.matricula_id,
                    u.cuenta_id,
                    m.curso_id;`;

    const [ result ] = await pool.query(query, [ curso ]);

    return result
}

export const modelGetCursosByDocente = async ( id ) => {

    const query = `select
                    u.cuenta_id  as Cuenta,
                    u.nombre     as Docente,
                    r.nombre     as Rol,
                    (
                        select json_arrayagg(c2.nombre)
                        from matriculas m2
                        join cursos      c2 on c2.curso_id = m2.curso_id
                        where m2.cuenta_id  = u.cuenta_id
                        and m2.periodo_id  = 1
                    ) as Periodo_1,
                    (
                        select json_arrayagg(c2.nombre)
                        from matriculas m2
                        join cursos      c2 on c2.curso_id = m2.curso_id
                        where m2.cuenta_id  = u.cuenta_id
                        and m2.periodo_id  = 2
                    ) as Periodo_2,
                    (
                        select json_arrayagg(c2.nombre)
                        from matriculas m2
                        join cursos      c2 on c2.curso_id = m2.curso_id
                        where m2.cuenta_id  = u.cuenta_id
                        and m2.periodo_id  = 3
                    ) as Periodo_3

                    from usuarios u
                    inner join roles r on r.rol_id = u.rol_id
                    where u.rol_id = 3
                    and u.cuenta_id = ?;
`;

    const [ rows ] = await pool.query(query, [ id ]);

    return rows
}

export const modelGetStudentsByCurso = async ( curso, periodo ) => {

    const query = `select
        u.cuenta_id as Cuenta,
        u.nombre as Estudiante,
        c.nombre as Curso,
        m.periodo_id as Periodo
        from cursos c
        inner join matriculas m on m.curso_id = c.curso_id
        inner join usuarios u on u.cuenta_id = m.cuenta_id
        where c.nombre = ?
        and u.rol_id != 3 and  u.rol_id != 1 and m.periodo_id = ?;`

    const [ rows ] = await pool.query(query, [ curso, periodo ]);

    return rows
}

export const modelGetStudentsByCursoPeriodo = async ( curso, cuenta_id ,periodo_id ) => {

    const query = `select
        m.matricula_id as Matricula,
        u.cuenta_id as Cuenta,
        u.nombre as Estudiante,
        c.nombre as Curso,
        m.periodo_id as Periodo
        from cursos c
        inner join matriculas m on m.curso_id = c.curso_id
        inner join usuarios u on u.cuenta_id = m.cuenta_id
        where c.nombre = ? and m.cuenta_id = ?
        and u.rol_id != 3 and  u.rol_id != 1 and m.periodo_id = ?;`

    const [ rows ] = await pool.query(query, [ curso, cuenta_id ,periodo_id ]);

    return rows
}

export const modelCantidadCursosByDocente = async ( id, periodo ) => {

    const query = `select count(distinct m.curso_id) as total
                    from matriculas m
                    join usuarios u on u.cuenta_id = m.cuenta_id
                where u.rol_id = 3
                and u.cuenta_id = ?
                and m.periodo_id = ?;`;

    const [ rows ] = await pool.query(query, [ id , periodo ]);
    return rows[0];
} 

export const existeCurso = async ( curso ) => {

    const query = `select * from cursos where nombre = ?;`;

    const [ rows ] = await pool.query(query, [ curso ]);
    return rows[0];

}

export const modelInscribirDocente = async ( matricula, cuenta_id, curso, periodo ) => {

    let cnx;

    try {
        
        cnx = await pool.getConnection();

        await cnx.beginTransaction();

        const query = `INSERT INTO matriculas (matricula_id, cuenta_id, curso_id, periodo_id, resultado) VALUES( ?, ?, (select curso_id from cursos where nombre = ?), ?, '');`;

        const [ result ] = await pool.query(query, [ matricula, cuenta_id, curso, periodo ]);

        await cnx.commit();
        return result

    } catch (error) {
        
        await cnx.rollback();
        throw error;

    } finally {
        
        cnx.release();
    }

}

export const modelInsertarCalificacion = async ( matricula_id, nota, parcial ) => {

    let cnx;

    try {

        cnx = await pool.getConnection();

        await cnx.beginTransaction();
        
        const query = `INSERT INTO calificaciones 
        (matricula_id, nota, subperiodo_id) VALUES ( ?, ?, ?);`;

        await cnx.execute( query, [ matricula_id, nota, parcial ] );

        cnx.commit();
        return true;

    } catch (error) {

        await cnx.rollback();

    } finally {

        cnx.release();

    }

}

export const modelExisteNota = async ( curso, cuenta_id, periodo_id, parcial ) => {

    const query = `
        SELECT EXISTS (
        SELECT 1
        FROM calificaciones cf
        INNER JOIN matriculas m 
            ON cf.matricula_id = m.matricula_id
        INNER JOIN cursos c 
            ON m.curso_id = c.curso_id
        WHERE c.nombre        = ?
            AND m.cuenta_id     = ?
            AND m.periodo_id    = ?
            AND cf.subperiodo_id= ?
        ) AS ya_existe;`;

    const [ row ] = await pool.query( query, [ curso, cuenta_id, periodo_id, parcial  ] );

    return row;
}