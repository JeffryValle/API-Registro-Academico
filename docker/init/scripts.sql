use registro_academico;

-- Ver Estudiantes y Docentes a los cursos que pertencen
SELECT 
	m.matricula_id AS Matricula,
	u.nombre AS Nombre,
	u.cuenta_id AS Cuenta,
	c.nombre AS Curso,
	c.curso_id AS CodigoCurso
FROM matriculas AS m
INNER JOIN usuarios AS u ON u.cuenta_id = m.cuenta_id
INNER JOIN cursos AS c ON c.curso_id = m.curso_id;

SELECT
	c.curso_id as CodigoCurso,
	c.nombre AS Curso,
	u.nombre AS Nombre,
	u.cuenta_id AS Cuenta,
    u.correo as Correo
FROM matriculas AS m
INNER JOIN usuarios AS u ON u.cuenta_id = m.cuenta_id
INNER JOIN cursos AS c ON c.curso_id = m.curso_id
WHERE c.curso_id = '550e8400-e29b-41d4-a716-446655440008';

-- Ver cursos a los que pertenece un docente o estudiante
SELECT
	u.cuenta_id AS Cuenta,
	u.nombre AS Estudiante,
	c.curso_id as CodigoCurso,
	c.nombre AS Curso,
    c.cupos AS Cupos,
    m.fecha_Creado AS FechaInscripcion
FROM matriculas AS m
INNER JOIN usuarios AS u ON u.cuenta_id = m.cuenta_id
INNER JOIN cursos AS c ON c.curso_id = m.curso_id
WHERE u.cuenta_id = '20212000020';

-- Revisa si el profesor pertenece al curso
select 
	m.cuenta_id as Cuenta,
    c.nombre as Curso
from matriculas m
inner join cursos c on c.curso_id = m.curso_id
where m.cuenta_id = '20212000020' AND c.nombre = 'Calculo I';

-- Ver notas por curso de profesor y periodo
select
  m.matricula_id as Matricula,
  u.cuenta_id as Cuenta,
  m.curso_id as Curso,
  max(case when cf.subperiodo_id = 1 then cf.nota end) as Nota1,
  max(case when cf.subperiodo_id = 2 then cf.nota end) as Nota2,
  max(case when cf.subperiodo_id = 3 then cf.nota end) as Nota3,
  round(avg(cf.nota), 1) as Promedio,
  case when avg(cf.nota) >= 65 then 'APR'
       else 'RPB'
  end as Estado
from matriculas as m
inner join usuarios as u on u.cuenta_id = m.cuenta_id
inner join calificaciones as cf on cf.matricula_id = m.matricula_id
where m.curso_id = (select curso_id from cursos where nombre = 'Calculo I')
  and m.periodo_id = 1
group by
  m.matricula_id,
  u.cuenta_id,
  m.curso_id;

-- Ver notas por curso de profesor 
select
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
where m.curso_id = (select curso_id from cursos where nombre = 'Calculo I')
group by
  m.matricula_id,
  u.cuenta_id,
  m.curso_id;
  
-- Ver docentes y los cursos a los que pertenece

select 
	u.cuenta_id Cuenta,
	u.nombre as Docente, 
    r.nombre as Rol,
    c.nombre as Curso
from usuarios u
inner join roles r on r.rol_id = u.rol_id
inner join matriculas m on m.cuenta_id = u.cuenta_id
inner join cursos c on c.curso_id = m.curso_id
where u.rol_id = 3 and m.cuenta_id = 20212000020;

SELECT
  u.cuenta_id    AS Cuenta,
  u.nombre       AS Docente,
  r.nombre       AS Rol,
  JSON_ARRAYAGG(c.nombre) AS Cursos
FROM usuarios u
INNER JOIN roles r       ON r.rol_id       = u.rol_id
INNER JOIN matriculas m  ON m.cuenta_id    = u.cuenta_id
INNER JOIN cursos c      ON c.curso_id     = m.curso_id
WHERE u.rol_id = 3
  AND u.cuenta_id = 20212000020
GROUP BY
  u.cuenta_id,
  u.nombre,
  r.nombre;
  
SELECT
  u.cuenta_id    AS Cuenta,
  u.nombre       AS Docente,
  r.nombre       AS Rol,
  pa.nombre      AS Periodo,
  JSON_ARRAYAGG(c.nombre) AS Cursos
FROM usuarios u
INNER JOIN roles r       ON r.rol_id    = u.rol_id
INNER JOIN matriculas m  ON m.cuenta_id = u.cuenta_id
INNER JOIN cursos c      ON c.curso_id  = m.curso_id
INNER JOIN periodo_academico pa
                       ON pa.periodo_id = m.periodo_id
WHERE u.rol_id = 3
  AND u.cuenta_id = 20212000020
GROUP BY
  u.cuenta_id,
  u.nombre,
  r.nombre,
  m.periodo_id,
  pa.nombre
ORDER BY
  m.periodo_id;
  
  select
  u.cuenta_id  as Cuenta,
  u.nombre     as Docente,
  r.nombre     as Rol,
  /* Cursos en el período 1 */
  (
    select json_arrayagg(c2.nombre)
    from matriculas m2
    join cursos      c2 on c2.curso_id = m2.curso_id
    where m2.cuenta_id  = u.cuenta_id
      and m2.periodo_id  = 1
  ) as Periodo_1,
  /* Cursos en el período 2 */
  (
    select json_arrayagg(c2.nombre)
    from matriculas m2
    join cursos      c2 on c2.curso_id = m2.curso_id
    where m2.cuenta_id  = u.cuenta_id
      and m2.periodo_id  = 2
  ) as Periodo_2,
  /* Cursos en el período 3 */
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
  and u.cuenta_id = 20212000020;
  
-- Ver estudiantes que están inscritos en un curso
select
  u.cuenta_id as Cuenta,
  u.nombre as Estudiante,
  c.nombre as Curso
from cursos c
inner join matriculas m on m.curso_id = c.curso_id
inner join usuarios u on u.cuenta_id = m.cuenta_id
where c.nombre = 'Calculo I' and m.cuenta_id = '20212000006'
  and u.rol_id != 3 and  u.rol_id != 1 and m.periodo_id = 1;

-- Inscribir un docente a un curso
select 
      m.cuenta_id as Cuenta,
      c.nombre    as Curso,
      m.periodo_id
    from matriculas m
    inner join cursos c 
      on c.curso_id = m.curso_id
    where m.cuenta_id   = '20212000020'
      and c.nombre      = 'Calculo I'
      and m.periodo_id  = 2;

select count(distinct m.curso_id) as total
from matriculas m
join usuarios u on u.cuenta_id = m.cuenta_id
where u.rol_id = 3 and u.cuenta_id = '20212000020';

  -- Me devuelve la cantidad de cursos inscritos por docente segun el periodo
  select
  m.periodo_id    as Periodo,
  count(distinct m.curso_id) as TotalCursos
from matriculas m
join usuarios u on u.cuenta_id = m.cuenta_id
where u.rol_id = 3 and u.cuenta_id = '20212000020'
group by
  m.periodo_id
order by
  m.periodo_id;

select count(distinct m.curso_id) as total
from matriculas m
join usuarios u on u.cuenta_id = m.cuenta_id
where u.rol_id = 3
  and u.cuenta_id = '20212000020'
  and m.periodo_id = 3;



INSERT INTO matriculas (matricula_id, cuenta_id, curso_id, periodo_id, resultado) VALUES
('d1f2e3a4-b5c6-47d8-zzz2-1234567890ab', '20212000020', (select curso_id from cursos where nombre = 'Calculo I'), 1, '');

select 
	m.cuenta_id as Cuenta,
	c.nombre as Curso
from matriculas m
inner join cursos c on c.curso_id = m.curso_id
where m.cuenta_id = '20212000020' AND c.nombre = 'Biología Celular' and m.periodo_id = 2;

-- Ingresar calificaciones de un estudiante a un curso según el docente

select * from matriculas;

INSERT INTO calificaciones (matricula_id, nota, subperiodo_id) 
VALUES ('d1f2e3a4-b5c6-47d8-9e0f-1234567890ab', 85.50, 1);

select
m.matricula_id as Matricula,
u.cuenta_id as Cuenta,
u.nombre as Estudiante,
c.nombre as Curso,
m.periodo_id as Periodo
from cursos c
inner join matriculas m on m.curso_id = c.curso_id
inner join usuarios u on u.cuenta_id = m.cuenta_id
where c.nombre = 'Arte Moderno' and m.cuenta_id = '20212000005'
and u.rol_id != 3 and  u.rol_id != 1 and m.periodo_id = 1;

-- Revisa si ya existe esta calificacion
SELECT EXISTS (
  SELECT 1
  FROM calificaciones cf
  INNER JOIN matriculas m 
    ON cf.matricula_id = m.matricula_id
  INNER JOIN cursos c 
    ON m.curso_id = c.curso_id
  WHERE c.nombre        = 'Arte Moderno'
    AND m.cuenta_id     = '20212000005'
    AND m.periodo_id    = 1
    AND cf.subperiodo_id= 3
) AS ya_existe;

select 
	m.matricula_id as Matricula,
    c.nota as Nota,
    c.subperiodo_id as Parcial,
    m.cuenta_id as Cuenta,
    m.periodo_id as Periodo,
    cr.nombre as Curso
from calificaciones c
inner join matriculas m on m.matricula_id = c.matricula_id
inner join cursos cr on cr.curso_id = m.curso_id 
where m.cuenta_id = '20212000005';



