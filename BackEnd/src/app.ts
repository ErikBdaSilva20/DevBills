import fastify, { type FastifyInstance } from "fastify";
import routes from "./routes";
import transactionsRoutes from "./routes/transactions.routes";
import { env } from "process";

const app: FastifyInstance = fastify(
  {
    logger: {
      level: env.NODE_ENV === "development" ? 'info' : "error",
    },
  }
);

app.register(routes, {prefix: "/api"});
app.register(transactionsRoutes, {prefix: "/transactions"});


export default app;
