import { z } from "zod";

const validatePassword = (password) => {
  const errors = [];

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("A senha precisa de uma letra minúscula.");
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("A senha precisa de uma letra maiúscula.");
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push("A senha precisa de um número.");
  }

  if (password.length < 8) {
    errors.push("A senha precisa de no mínimo 8 caracteres");
  }
  if (password.length > 32) {
    errors.push("A senha precisa de no máximo 32 caracteres");
  }
  return errors.length > 0 ? errors : null;
};

export const signinSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),
  password: z
    .string()
    .min(8, "A senha precisa ter no mínimo 8 caracteres")
    .max(32, "A senha deve ter no máximo 32 caracteres")
    .superRefine((password, ctx) => {
      const errors = validatePassword(password);
      if (errors) {
        errors.forEach((error) =>
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: error,
          })
        );
      }
    }),
});
