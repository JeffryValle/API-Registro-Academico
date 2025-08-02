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

select * from cursos;
