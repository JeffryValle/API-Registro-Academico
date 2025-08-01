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

INSERT INTO matriculas ( matricula_id, usuario_id, curso_id)
VALUES ('UUID-MATRICULA-001','USUARIO123',
    (SELECT curso_id FROM cursos WHERE nombre = 'Matemáticas I')
);

