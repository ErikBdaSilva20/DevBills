import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema } from "../schemas/transactions.schema";
import zodToJsonSchema from "zod-to-json-schema";

const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),

    },
    handler: createTransaction
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema.pick({ date: true, type: true })),
    },
    handler: getTransactions
  });
};

export default transactionsRoutes;
