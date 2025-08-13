# API-Registro-Academico
Gestión de Cursos y Matrículas por medio de una API-RESTful utilizando Node.js y Express. Tambien configura un contenedor de **MySQL 8** usando Docker incluyendo un script de inicialización 

## 📦 Inicializar el proyecto de Node.js
```
npm install
```
Esto iniciara e instalara todas las dependecias necesarias. 

## Instrucciones para iniciar

### 1. Requisitos

Asegúrate de tener instalados:

- [Docker](https://www.docker.com/)

### 2. Levantar el contenedor

Desde la raíz del proyecto donde se encuentra el archivo `docker-compose.yml`, ejecuta:

```bash
docker compose up -d 
```
Esto iniciará un contenedor MySQL con:

- Base de datos inicial: `registro_academico`
- Tablas configuradas correctamente

## Configuracion de Variables de Entorno

### Variables de entorno dentro del Docker

| Parámetro           | Valor       |
| -------------       | ----------- |
| MYSQL_ROOT_PASSWORD | `1234`      |
| MYSQL_DATABASE      | `localhost` |
| MYSQL_USER          | `user`      |
| MYSQL_PASSWOR       | `1234`      |

### Variables de entorno para la conexion 

| Parámetro         | Valor                              |
| ----------------- | ---------------------------------- |
| `PORT`            | `3000`                             |
| `SECRET_JWT_SEED` |  |
| `SALT`            | (vacío)                            |
| `DB_PORT`         | `3309`                             |
| `DB_HOST`         | `localhost`                        |
| `DB_USER`         | `root`                             |
| `DB_PASSWORD`     | `1234`                             |
| `DB_NAME`         | `registro_academico`               |



## 🧱 Tablas creadas

### Roles
| Campo         | Tipo         | Descripción                                |
| ------------- | ------------ | ------------------------------------------ |
| `rol_id`      | INT          | Identificador único (PK, auto incremental) |
| `nombre`      | VARCHAR(50)  | Nombre del rol                             |
| `descripcion` | VARCHAR(150) | Descripción del rol                        |

### Usuarios
| Campo             | Tipo         | Descripción                                                     |
| ----------------- | ------------ | --------------------------------------------------------------- |
| `cuenta_id`       | BINARY(16)   | UUID binario como PK                                            |
| `nombre`          | VARCHAR(200) | Nombre completo del usuario                                     |
| `correo`          | VARCHAR(150) | Correo electrónico (único)                                      |
| `telefono`        | VARCHAR(12)  | Número de teléfono                                              |
| `password_hash`   | VARCHAR(255) | Contraseña almacenada en hash (bcrypt)                          |
| `cambio_password` | BOOLEAN      | Indica si el usuario debe cambiar contraseña (por defecto true) |
| `fecha_creado`    | TIMESTAMP    | Fecha de creación del usuario                                   |
| `rol_id`          | INT          | FK a `roles.rol_id`                                             |

### Cursos
| Campo      | Tipo         | Descripción                          |
| ---------- | ------------ | ------------------------------------ |
| `curso_id` | BINARY(16)   | UUID binario como PK                 |
| `nombre`   | VARCHAR(255) | Nombre del curso (único)             |
| `cupos`    | INT          | Cantidad máxima de cupos disponibles |

### periodo_academico
| Campo        | Tipo        | Descripción                                |
| ------------ | ----------- | ------------------------------------------ |
| `periodo_id` | INT         | Identificador único (PK, auto incremental) |
| `nombre`     | VARCHAR(15) | Nombre del periodo académico               |

### sub_periodo
| Campo           | Tipo        | Descripción                                |
| --------------- | ----------- | ------------------------------------------ |
| `subperiodo_id` | INT         | Identificador único (PK, auto incremental) |
| `nombre`        | VARCHAR(15) | Nombre del subperiodo                      |

### matriculas
| Campo          | Tipo                                    | Descripción                                    |
| -------------- | --------------------------------------- | ---------------------------------------------- |
| `matricula_id` | BINARY(16)                              | UUID binario como PK                           |
| `cuenta_id`    | BINARY(16)                              | FK a `usuarios.cuenta_id`                      |
| `curso_id`     | BINARY(16)                              | FK a `cursos.curso_id`                         |
| `periodo_id`   | INT                                     | FK a `periodo_academico.periodo_id`            |
| `resultado`    | VARCHAR(12)                             | Resultado de la matrícula (aprobado/reprobado) |
| `fecha_creado` | TIMESTAMP                               | Fecha de creación de la matrícula              |
| `fecha_final`  | DATETIME                                | Fecha final de la matrícula                    |
| **UNIQUE**     | (`cuenta_id`, `curso_id`, `periodo_id`) | Evita duplicados en la misma matrícula         |

### calificaciones
| Campo             | Tipo                              | Descripción                                  |
| ----------------- | --------------------------------- | -------------------------------------------- |
| `calificacion_id` | INT                               | Identificador único (PK, auto incremental)   |
| `matricula_id`    | BINARY(16)                        | FK a `matriculas.matricula_id`               |
| `nota`            | DECIMAL(5,2)                      | Nota obtenida                                |
| `fecha_registro`  | DATETIME                          | Fecha en que se registró la calificación     |
| `subperiodo_id`   | INT                               | FK a `sub_periodo.subperiodo_id`             |
| **UNIQUE**        | (`matricula_id`, `subperiodo_id`) | Evita duplicados de nota en mismo subperiodo |


## Arrancar la aplicacion
```
npm run dev 
```

## ¿Como acceder a la documentación? 
-  Asegúrate de tener el servidor en ejecución
- Abre tu navegador web y accede a la siguiente URL:
```
http://localhost:PUERTO/api-docs
```
*PUERTO se configura como una de las variables de entorno. 