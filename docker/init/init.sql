create table usuarios (
	cuentaID varchar(12) primary key not null,
    nombre varchar(200) not null,
    correo varchar(150) not null unique,
    telefono varchar(12) not null,
    rol varchar(150) not null,
    password_hash varchar(255) not null,
    cambio_password boolean not null default true,
    fecha_creado timestamp default current_timestamp
);


create table cursos (
	cursoID char(36) primary key not null,
    nombre varchar(255) unique not null,
    cupos int not null
);

create table matriculas (
	matriculaID char(36) primary key not null,
    usuarioID varchar(12) not null,
    cursoID char(36) not null,
    fecha_creado timestamp default current_timestamp,
    foreign key (usuarioID) references usuarios(cuentaID),
    foreign key (cursoID) references cursos(cursoID)
);	
