import { Router } from "express";
import { createOrderController } from "./CreateOrder.controller";
import { getOrderController } from "./getOrder.controller";

const ordersRouter = Router();

ordersRouter.post("/", (req, res) => createOrderController.execute(req, res));
// ordersRouter.patch("/", (req, res) => editItemController.execute(req, res));
ordersRouter.get("/:id", (req, res) => getOrderController.execute(req, res));
// ordersRouter.delete("/:id", (req, res) => deleteItemController.execute(req, res));
// ordersRouter.get("/", (req, res) => getItemsListController.execute(req, res));

export { ordersRouter };
