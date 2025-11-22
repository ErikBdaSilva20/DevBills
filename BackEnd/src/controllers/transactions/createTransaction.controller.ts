import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transactions.schema";
import prisma from "../../config/prisma";

const createTransaction = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {

  const userID = 'JIU8325U78FUADIMISU'

  if (!userID) {
    return res.status(400).send({ message: 'User not authenticated' })
  }


  const result = createTransactionSchema.safeParse(req.body)

  if (!result.success) {
    const errorMessage =
      result.error.issues?.[0]?.message || "Validation invalid";

    return res.status(400).send({ error: errorMessage });
  }


  const transaction = result.data

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type
      }

    })
    if (!category) {
      return res.status(404).send({ message: 'Category invalid' })
    }

    const parsedDate = new Date(transaction.date)

    const newTransaction = await prisma.transaction.create({
      data: {
        description: transaction.description,
        amount: transaction.amount,
        date: parsedDate,
        type: transaction.type,
        userId: userID,
        categoryId: transaction.categoryId,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).send(newTransaction)
  } catch (err) {
    req.log.error(err);
    return res.status(500).send({ message: 'Internal server error: unable to create transaction' })
  }
}




export default createTransaction