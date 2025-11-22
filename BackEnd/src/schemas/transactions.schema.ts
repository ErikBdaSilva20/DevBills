import { z } from "zod";
import { ObjectId } from "mongodb";
import { TransactionType } from "@prisma/client";

const isValidObjectId = (id: string) => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Descrição obrigatória").max(100, "Descrição muito longa"),

  amount: z.number().positive("Valor deve ser positivo"),

  date: z.coerce.date(),

  categoryId: z.string().refine(isValidObjectId, { message: "Categoria inválida" }),

  type: z.enum([TransactionType.EXPENSE, TransactionType.INCOME])
});
