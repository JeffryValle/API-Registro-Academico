use registro_academico;

select * from calificaciones;
select * from cursos;
select * from matriculas;
select * from periodo_academico;
select * from roles;
select * from sub_periodo;
select * from usuarios;

SELECT 
	r.nombre AS Rol 
FROM usuarios AS u
INNER JOIN roles AS r ON r.rol_id = u.rol_id
WHERE u.cuenta_id = '20212000001';

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
WHERE c.curso_id = '550e8400-e29b-41d4-a716-446655440001';

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
WHERE u.cuenta_id = '20212000004';

SELECT 
	m.matricula_id AS Matricula,
    m.usuario_id AS Cuenta,
    c.nombre AS Curso,
    m.fecha_creado AS FechaInscripcion
FROM matriculas AS m
INNER JOIN cursos AS c on c.curso_id = m.curso_id
WHERE m.usuario_id = '20212000004' AND c.nombre = 'Historia Universal';

select * from cursos;
select * from usuarios;

SELECT *
FROM matriculas
WHERE usuario_id = '20212000003';

SELECT 
    c.curso_id AS CodigoCurso,
    c.nombre AS Curso,
    c.cupos AS Cupos,
    COUNT(m.usuario_id) AS Inscritos,
    (c.cupos - COUNT(m.usuario_id)) AS Disponibles
FROM cursos c
LEFT JOIN matriculas m ON m.curso_id = c.curso_id
WHERE c.nombre = "Historia Universal"
GROUP BY c.curso_id, c.nombre, c.cupos;


