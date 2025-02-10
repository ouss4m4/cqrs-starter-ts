import { Router } from "express";
import { createOrderController } from "./create-order.controller";
import { getOrderController } from "./get-order.controller";
import { completeOrderController } from "./complete-order.controller";

const ordersRouter = Router();

ordersRouter.post("/", (req, res) => createOrderController.execute(req, res));
ordersRouter.patch("/:id", (req, res) =>
  completeOrderController.execute(req, res)
);
ordersRouter.get("/:id", (req, res) => getOrderController.execute(req, res));
// ordersRouter.delete("/:id", (req, res) => deleteItemController.execute(req, res));
// ordersRouter.get("/", (req, res) => getItemsListController.execute(req, res));

export { ordersRouter };
