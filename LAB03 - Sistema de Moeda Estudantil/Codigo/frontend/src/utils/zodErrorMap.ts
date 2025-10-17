import { z } from "zod";

export const ptErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const t = {
    invalid_type: "Campo obrigatório",
    invalid_string_email: "E-mail inválido",
    too_small_string: (min: number) =>
      `Campo deve ter no mínimo ${min} caracteres`,
    too_big_string: (max: number) =>
      `Campo deve ter no máximo ${max} caracteres`,
    default: "Valor inválido",
  };

  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return { message: t.invalid_type };

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email")
        return { message: t.invalid_string_email };
      return { message: t.default };

    case z.ZodIssueCode.too_small: {
      // Converte bigint -> number quando necessário
      const min =
        typeof issue.minimum === "bigint"
          ? Number(issue.minimum)
          : issue.minimum;
      if (issue.type === "string")
        return { message: t.too_small_string(min) };
      return { message: t.default };
    }

    case z.ZodIssueCode.too_big: {
      const max =
        typeof issue.maximum === "bigint"
          ? Number(issue.maximum)
          : issue.maximum;
      if (issue.type === "string")
        return { message: t.too_big_string(max) };
      return { message: t.default };
    }

    default:
      return { message: ctx.defaultError || t.default };
  }
};

z.setErrorMap(ptErrorMap);