import pool from '../config/database.js';

export const checkCursoById = async ( curso, cuenta_id ) => {

    const query = `select 
                    m.cuenta_id as Cuenta,
                    c.nombre as Curso
                from matriculas m
                inner join cursos c on c.curso_id = m.curso_id
                where m.cuenta_id = ? AND c.nombre = ?;`;

    const [ rows ] = await pool.query(query, [ cuenta_id, curso ]);

    return rows
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