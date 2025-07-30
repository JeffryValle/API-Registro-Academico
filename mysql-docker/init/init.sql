create table usuarios (
	cuenta_id varchar(12) primary key not null,
    nombre varchar(200) not null,
    correo varchar(150) not null unique,
    telefono varchar(12) not null,
    rol varchar(150) not null,
    password_hash varchar(255) not null,
    cambio_password boolean not null default true,
    fecha_creado timestamp default current_timestamp
);

create table cursos (
	curso_id char(36) auto_increment primary key not null,
    nombre varchar(255) unique not null,
    cupos int not null
);

create table matriculas (
	matricula_id char(36) primary key not null,
    usuario_id varchar(12) not null,
    curso_id char(36) not null,
    fecha_creado timestamp default current_timestamp,
    UNIQUE (usuario_id, curso_id),
    foreign key (usuario_id) references usuarios(cuenta_id),
    foreign key (curso_id) references cursos(curso_id),
);