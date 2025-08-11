import zod from 'zod';

export const loginSchema = zod.object({
  email: zod.email(),
  password: zod.string().min(8).max(255())
});

export const registerSchema = zod.object({
  name: zod.string().min(2).max(200()),
  email: zod.email(),
  phone: zod.string().min(8).max(12()),
  password: zod.string().min(8).max(100()),
  role: zod.enum(['admin', 'estudiante', 'profesor'],{message: "Rol no válido"}),
});


export const setPasswordSchema = zod.object({
    "old_password": zod.string().min(8).max(255()),
    "new_password": zod.string().min(8).max(255()),
    "confirm_password": zod.string().min(8).max(255()).refine((val, ctx) => {
        if (val !== ctx.parent.new_password) {
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "Las contraseñas no coinciden"
            });
        }
        return true;
    })
});
