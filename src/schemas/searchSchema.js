import { z } from "zod";

export const searchSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "O campo de pesquisa deve ser preenchido." })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O campo de pesquisa não pode conter apenas espaços em branco.",
    }),
});
