import { z } from "zod";

export const cursoSchema = z.object(
    {

  nombre: z
    .string({ required_error: "El nombre es obligatorio" })
    .trim()
    .min(3, "El nombre del curso debe tener al menos 3 caracteres")
    .max(50, "El nombre del curso no debe superar los 50 caracteres"),
  
  cupos: z
    .number({ required_error: "Los cupos son obligatorios" })
    .int("Los cupos deben ser un número entero")
    .min(1, "El número de cupos debe ser mínimo 1")
    .max(100, "El número de cupos no debe superar 100"),

}

);

export const cursoUpdateSchema = cursoSchema.partial();