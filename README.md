# API-Registro-Academico
Gestión de Cursos y Matrículas por medio de una API-RESTful utilizando Node.js y Express. Tambien configura un contenedor de **MySQL 8** usando Docker incluyendo un script de inicialización 

## 📦 Inicializar el proyecto de Node.js
```
npm install
```
Esto iniciara e instalara todas las dependecias necesarias. 

##Instrucciones para iniciar

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

## 🧱 Tablas creadas

###roles
| Campo         | Tipo         | Descripción                                |
| ------------- | ------------ | ------------------------------------------ |
| `rol_id`      | INT          | Identificador único (PK, auto incremental) |
| `nombre`      | VARCHAR(50)  | Nombre del rol                             |
| `descripcion` | VARCHAR(150) | Descripción del rol                        |

## Arrancar la aplicacion
```
npm run dev 
```