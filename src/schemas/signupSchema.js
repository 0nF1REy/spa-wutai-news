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

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
      .max(50, { message: "O nome deve ter no máximo 50 caracteres" })
      .transform((name) => {
        const trimmedName = name.trim();
        const sanitizedName = trimmedName.replace(/[^\p{L}\s]/gu, "");

        if (sanitizedName === sanitizedName.toUpperCase()) {
          return sanitizedName
            .toLowerCase()
            .split(" ")
            .filter((word) => word)
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ");
        }
        return sanitizedName
          .split(" ")
          .filter((word) => word)
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");
      }),
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
    confirmPassword: z
      .string()
      .min(8, "A senha precisa ter no mínimo 8 caracteres")
      .max(32, "A senha deve ter no máximo 32 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });
