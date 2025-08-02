use registro_academico;

SELECT 
	m.matricula_id AS Matricula,
	u.nombre AS Nombre,
	u.cuenta_id AS Cuenta,
	c.nombre AS Curso,
	c.curso_id AS CodigoCurso
FROM matriculas AS m
INNER JOIN usuarios AS u ON u.cuenta_id = m.usuario_id
INNER JOIN cursos AS c ON c.curso_id = m.curso_id;

SELECT
	c.curso_id as CodigoCurso,
	c.nombre AS Curso,
	u.nombre AS Nombre,
	u.cuenta_id AS Cuenta,
    u.correo as Correo
FROM matriculas AS m
INNER JOIN usuarios AS u ON u.cuenta_id = m.usuario_id
INNER JOIN cursos AS c ON c.curso_id = m.curso_id
WHERE c.curso_id = 'gfgd8erdh5asdf';

SELECT
	u.cuenta_id AS Cuenta,
	u.nombre AS Estudiante,
	c.curso_id as CodigoCurso,
	c.nombre AS Curso,
    c.cupos AS Cupos,
    m.fecha_Creado AS FechaInscripcion
FROM matriculas AS m
INNER JOIN usuarios AS u ON u.cuenta_id = m.usuario_id
INNER JOIN cursos AS c ON c.curso_id = m.curso_id
WHERE u.cuenta_id = '20212000761';

SELECT * FROM matriculas;
SELECT * FROM cursos;

SELECT 
	m.matricula_id AS Matricula,
    m.usuario_id AS Cuenta,
    c.nombre AS Curso,
    m.fecha_creado AS FechaInscripcion
FROM matriculas AS m
INNER JOIN cursos AS c on c.curso_id = m.curso_id
WHERE m.usuario_id = '20210000001' AND c.nombre = 'Inteligencia Artificial';

SELECT *
FROM matriculas
WHERE usuario_id = '20210000001';

SELECT 
    c.curso_id AS CodigoCurso,
    c.nombre AS Curso,
    c.cupos AS Cupos,
    COUNT(m.usuario_id) AS Inscritos,
    (c.cupos - COUNT(m.usuario_id)) AS Disponibles
FROM cursos c
LEFT JOIN matriculas m ON m.curso_id = c.curso_id
WHERE c.nombre = "Inteligencia Artificial"
GROUP BY c.curso_id, c.nombre, c.cupos;

-- checkCursoById

select * 
from cursos;

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
  
-- 
  
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


-- Ver estudiantes que están inscritos en un curso

select
  u.cuenta_id as Cuenta,
  u.nombre as Estudiante,
  c.nombre as Curso
from cursos c
inner join matriculas m on m.curso_id = c.curso_id
inner join usuarios u on u.cuenta_id = m.cuenta_id
where c.nombre = 'Calculo I'
  and u.rol_id != 3 and  u.rol_id != 1;


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

select * from cursos;
select * from matriculas;






