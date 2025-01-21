import { z } from "zod";

const validatePassword = (password) => {
  const errors = [];

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra minúscula.");
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra maiúscula.");
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push("A senha deve conter pelo menos um número.");
  }

  if (password.length < 8) {
    errors.push("A senha deve conter pelo menos 8 caracteres.");
  }
  if (password.length > 32) {
    errors.push("A senha deve conter no máximo 32 caracteres.");
  }
  return errors.length > 0 ? errors : null;
};

export const signinSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "O campo de e-mail é obrigatório e deve ser preenchido." })
      .email({ message: "Por favor, insira um e-mail válido." })
      .toLowerCase(),
    password: z
      .string()
      .nonempty({ message: "O campo de senha é obrigatório e deve ser preenchido." })
      .min(8, "A senha deve conter pelo menos 8 caracteres.")
      .max(32, "A senha deve conter no máximo 32 caracteres.")
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
  })
  .refine(
    (data) => data.email.trim() !== "" && data.password.trim() !== "",
    {
      message: "Os campos não podem ser deixados em branco.",
      path: ["email", "password"],
    }
  );
