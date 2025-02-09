import express, { json } from "express";
import { ordersRouter } from "./Order/Create";

const app = express();
app.use(json());

const port = process.env.PORT || 3001;

app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Up and running on port ${port}`);
});
