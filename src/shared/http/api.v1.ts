import { Router } from "express";
import { ordersRouter } from "../../Order/controllers";

const apiV1Router = Router();

apiV1Router.use("/orders", ordersRouter);

export { apiV1Router };
