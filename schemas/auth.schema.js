import zod from 'zod';

const loginSchema = zod.object({
  user: zod.email(),
  password: zod.string().min(4, { message: "La contraseña debe tener al menos 4 caracteres" }).max(255)
});

export const validateLogin = (data) => {
    return loginSchema.safeParse(data)
}

const registerSchema = zod.object({
  name: zod.string().min(2).max(200),
  email: zod.email(),
  phone: zod.string().min(8).max(12),
  password: zod.string().min(8).max(100),
  role: zod.enum(['admin', 'estudiante', 'profesor'],{message: "Rol no válido"}),
});

export const validateRegister = (data) => {
    return registerSchema.safeParse(data)
}

const setPasswordSchema = zod.object({
    "old_password": zod.string().min(6).max(255),
    "new_password": zod.string().min(6).max(255),
    "confirm_password": zod.string().min(6).max(255).refine((data) => data.new_password === data.confirm_password, {
  message: "Las contraseñas nueva y de confirmación no coinciden",
  path: ["confirm_password"], // el error se marca en confirm_password
})
});

export const validateSetPassword = (data) => {
    return setPasswordSchema.safeParse(data)
}
