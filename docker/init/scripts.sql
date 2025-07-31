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
