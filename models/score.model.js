import pool from '../config/database.js';

export const verifyProfessor = async ( cuenta_id ) => {

    const query = `SELECT r.rol_id as rol FROM usuarios u
                    inner join roles r on r.rol_id = u.rol_id 
                    WHERE u.cuenta_id = UUID_TO_BIN( ? );`;

    const [ rows ] = await pool.query( query, [ cuenta_id ] );

    return rows[0] 
}   

export const checkCursoById = async ( curso, nombre, periodo ) => {

    const query = `select 
                    BIN_TO_UUID(m.cuenta_id) AS Cuenta,
                    c.nombre as Curso
                from matriculas m
                inner join cursos c on c.curso_id = m.curso_id
                where 
					m.cuenta_id = UUID_TO_BIN( (select BIN_TO_UUID(cuenta_id) from usuarios where nombre = ?) ) 
					AND c.nombre = ? 
                    and m.periodo_id = ? ;`;

    const [ rows ] = await pool.query(query, [ nombre, curso, periodo ]);

    return rows
}   

export const checkCursoByDocente = async ( nombre ) => {

    const query = `select distinct
                    BIN_TO_UUID(s.cuenta_id)   as Estudiante,
                    s.nombre      as nombre_estudiante,
                    BIN_TO_UUID(c.curso_id) as Curso_id,
                    c.nombre      as Curso
                    from matriculas md                      
                    join cursos c         on c.curso_id = md.curso_id
                    join matriculas ms    on ms.curso_id = c.curso_id   
                    join usuarios s       on s.cuenta_id = ms.cuenta_id 
                    where md.cuenta_id = (UUID_TO_BIN((select BIN_TO_UUID(cuenta_id) from usuarios where nombre = ? ))) 
                    and s.cuenta_id <> md.cuenta_id
                    and s.rol_id != 3;`;

    const [ rows ] = await pool.query(query, [ nombre ]);

    return rows

}

export const checkCursoByPeriodo = async ( curso, nombre, periodo ) => {
  const query = `
                    select 
                    m.cuenta_id as Cuenta,
                    c.nombre    as Curso,
                    m.periodo_id
                    from matriculas m
                    inner join cursos c 
                    on c.curso_id = m.curso_id
                    where c.nombre      = ? 
                    and m.cuenta_id   = (UUID_TO_BIN((select BIN_TO_UUID(cuenta_id) from usuarios where nombre = ? )))
                    and m.periodo_id  = ?;
                `;

  const [ rows ] = await pool.query(query, [ curso, nombre, periodo ]);
  return rows;  
}




export const modelGetScoreByCurso = async ( curso, periodo ) => {

    const query = `select
						  BIN_TO_UUID(m.matricula_id) as Matricula,
						  BIN_TO_UUID(u.cuenta_id) as Cuenta,
						  BIN_TO_UUID(m.curso_id) as Curso,
                          u.nombre as Nombre,
						  max(case when cf.subperiodo_id = 1 then cf.nota end) as Nota1,
						  max(case when cf.subperiodo_id = 2 then cf.nota end) as Nota2,
						  max(case when cf.subperiodo_id = 3 then cf.nota end) as Nota3,
						  case when count(distinct cf.subperiodo_id) = 3
							   then round(avg(cf.nota), 1)
							   else null
						  end as Promedio,
						  case
							when count(distinct cf.subperiodo_id) < 3 then 'Pendiente'
							when round(avg(cf.nota), 1) >= 65 then 'APR'
							else 'RPB'
						  end as Estado
						from matriculas as m
						left join usuarios as u on u.cuenta_id = m.cuenta_id
						left join calificaciones as cf on cf.matricula_id = m.matricula_id
						where m.curso_id = (select curso_id from cursos where nombre = ?)
								and m.periodo_id = ?
						group by
						  m.matricula_id,
						  u.cuenta_id,
						  m.curso_id;`;

    const [ result ] = await pool.query(query, [ curso, periodo ]);

    return result
}

export const modelGetCursosByDocente = async ( id ) => {

    const query = `select
                    BIN_TO_UUID(u.cuenta_id)  as Cuenta,
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
                    and u.cuenta_id = UUID_TO_BIN( ? );`;

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

export const modelGetStudentsByCursoPeriodo = async ( curso, nombre, periodo  ) => {

    const query = `select
        m.matricula_id as Matricula,
        u.cuenta_id as Cuenta,
        u.nombre as Estudiante,
        c.nombre as Curso,
        m.periodo_id as Periodo
        from cursos c
        inner join matriculas m on m.curso_id = c.curso_id
        inner join usuarios u on u.cuenta_id = m.cuenta_id
        where c.nombre = ? and m.cuenta_id = (UUID_TO_BIN((select BIN_TO_UUID(cuenta_id) from usuarios where nombre = ?)))
        and u.rol_id != 3 and  u.rol_id != 1 and m.periodo_id = ?;`

    const [ rows ] = await pool.query(query, [ curso, nombre, periodo ]);

    return rows
}

export const modelCantidadCursosByDocente = async ( nombre, periodo ) => {

    const query = `select count(distinct m.curso_id) as total
                    from matriculas m
                    join usuarios u on u.cuenta_id = m.cuenta_id
                where u.rol_id = 3
                and u.cuenta_id = (UUID_TO_BIN((select BIN_TO_UUID(cuenta_id) from usuarios where nombre = ?)))
                and m.periodo_id = ?;`;

    const [ rows ] = await pool.query(query, [ nombre , periodo ]);
    return rows[0];
} 

export const existeCurso = async ( curso ) => {

    const query = `select * from cursos where nombre = ?;`;

    const [ rows ] = await pool.query(query, [ curso ]);
    return rows[0];

}

export const modelInscribirDocente = async ( nombre, curso, periodo ) => {

    let cnx;

    try {
        
        cnx = await pool.getConnection();

        await cnx.beginTransaction();

        const query = `INSERT INTO matriculas (matricula_id, cuenta_id, curso_id, periodo_id, resultado) 
        VALUES
        (UUID_TO_BIN( UUID()), 
        (UUID_TO_BIN((select BIN_TO_UUID(cuenta_id) from usuarios where nombre = ?))), 
        (UUID_TO_BIN((select BIN_TO_UUID(curso_id) from cursos where nombre = ?))), 
        ?, 
        '');`;

        const [ result ] = await pool.query(query, [ nombre, curso, periodo ]);

        await cnx.commit();
        return result

    } catch (error) {
        
        await cnx.rollback();
        throw error;

    } finally {
        
        cnx.release();
    }

}

export const modelInsertarCalificacion = async ( matricula, nota, parcial ) => {

    let cnx;

    try {

        cnx = await pool.getConnection();

        await cnx.beginTransaction();
        
        const query = `INSERT INTO calificaciones 
        (matricula_id, nota, subperiodo_id) VALUES ( ?, ?, ? );`;

        await cnx.execute( query, [ matricula, nota, parcial ] );

        cnx.commit();
        return true;

    } catch (error) {

        await cnx.rollback();

    } finally {

        cnx.release();

    }

}

export const modelUpdateNota = async ( matricula, nota, parcial ) => {

    let cnx;

    try {

        cnx = await pool.getConnection();

        await cnx.beginTransaction();
        
        const query = `update calificaciones set nota = ?
                    where matricula_id = ? and subperiodo_id = ?;`;

        await cnx.execute( query, [ nota, matricula, parcial ] );

        cnx.commit();
        return true;

    } catch (error) {

        await cnx.rollback();

    } finally {

        cnx.release();

    }
}

export const modelExisteNota = async ( curso, nombre, periodo, parcial ) => {

    const query = `
         SELECT EXISTS (
        SELECT 1
        FROM calificaciones cf
        INNER JOIN matriculas m 
            ON cf.matricula_id = m.matricula_id
        INNER JOIN cursos c 
            ON m.curso_id = c.curso_id
        WHERE c.nombre        = ?
            AND m.cuenta_id   = (UUID_TO_BIN((select BIN_TO_UUID(cuenta_id) from usuarios where nombre = ?)))
            AND m.periodo_id  = ?
            AND cf.subperiodo_id= ?
        ) AS ya_existe;`;

    const [ row ] = await pool.query( query, [ curso, nombre, periodo, parcial  ] );

    return row;
}