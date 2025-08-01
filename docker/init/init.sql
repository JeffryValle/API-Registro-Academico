-- Crear base de datos
CREATE DATABASE IF NOT EXISTS registroAcademico;
USE registroAcademico;

-- Tabla: Roles
CREATE TABLE roles (
    rol_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150) NOT NULL
);

create table usuarios (
	cuenta_id varchar(12) primary key not null,
    nombre varchar(200) not null,
    correo varchar(150) not null unique,
    telefono varchar(12) not null,
    password_hash varchar(255) not null,
    cambio_password boolean not null default true,
    fecha_creado timestamp default current_timestamp,
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(rol_id)
);

create table cursos (
	curso_id char(36) primary key not null,
    nombre varchar(255) unique not null,
    cupos int not null
);

-- Tabla: Periodo Académico
CREATE TABLE periodo_academico (
    periodo_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL
);

create table matriculas (
	matricula_id char(36) primary key not null,
    usuario_id varchar(12) not null,
    curso_id char(36) not null,
    periodo_id INT NOT NULL,
    resultado varchar(12) not null, --para saber si esta fue aprobada o reprobada
    fecha_creado timestamp default current_timestamp,
    fecha_final datetime,
    UNIQUE (usuario_id, curso_id, periodo_id),
    foreign key (usuario_id) references usuarios(cuenta_id),
    foreign key (curso_id) references cursos(curso_id)
    FOREIGN KEY (periodo_id) REFERENCES periodo_academico(periodo_id)
);

CREATE TABLE calificaciones (
    calificacion_id INT PRIMARY KEY AUTO_INCREMENT,
    matricula_id char(36) NOT NULL UNIQUE,
    nota DECIMAL(5,2) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (matricula_id) REFERENCES matriculas(matricula_id)
);
