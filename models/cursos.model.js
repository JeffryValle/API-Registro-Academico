import pool from '../config/database.js';
import { v4 as uuidv4 } from "uuid";




export const createCurso = async (curso) => {
    const id = uuidv4();

    const query = 'INSERT INTO cursos (curso_id, nombre, cupos) VALUES (?, ?, ?) ;'

    const [result] = await pool.query(query, [id, curso.nombre, curso.cupos]);

    return result;
};


export const findByNombre = async (nombre) => {

    const query = 'SELECT nombre, cupos FROM cursos WHERE nombre = ? ;';

    const [rows] = await pool.query(query, [nombre]);

    return rows;
};

export const getAllCursos = async () => {

    const query= 'SELECT * FROM cursos ;'

    const [rows] = await pool.query(query);

    return rows;
};


export const getCursoByID = async ( curso_id ) => {

    const query = 'SELECT nombre, cupos FROM cursos WHERE curso_id = ? ;';

    const [ rows ] = await pool.query( query, [ curso_id ] );

    return rows[0];
}


export const updateCurso = async ( curso_id, curso) => {

    const query = 'UPDATE cursos SET nombre = ? , cupos = ? WHERE curso_id = ? ;'; 

    const [result] = await pool.query(query, [curso.nombre, curso.cupos, curso_id]); 

    return result; 

}


export const deleteCurso = async (curso_id) => {

    const query = 'DELETE FROM cursos WHERE curso_id = ?;';

    const [result] = await pool.query(query, [curso_id]);

    return result;  

}