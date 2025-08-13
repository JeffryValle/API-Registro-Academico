import z from 'zod';

const matriculaSchema = z.object({
    "cuenta": z.string({ message: "La cuenta debe ser un string"}),
    "curso": z.string({ message: "El curso debe ser un string"}),
    "periodo": z
        .number("El periodo debe ser un númerp")
        .int("El número debe ser entero positivo")
        .gte("Debe ser mayor o igual a 1")
        .lte("Debe ser menor o igual a 6")
});


export const validateMatricula = ( matricula ) => {
    return matriculaSchema.safeParse( matricula )
}