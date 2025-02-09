import express, { json } from "express";
import { OrderController } from "./Order/order.controller";

const app = express();
app.use(json());

const port = process.env.PORT || 3001;

app.post("/orders", OrderController.createOrder);

app.listen(port, () => {
  console.log(`Up and running on port ${port}`);
});
