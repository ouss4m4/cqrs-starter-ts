import express, { json } from "express";
import { ordersRouter } from "./Order/Create";
import { connectDb } from "./shared/db";

const app = express();
app.use(json());

const port = process.env.PORT || 3001;

app.use("/orders", ordersRouter);
connectDb();
app.listen(port, () => {
  console.log(`Up and running on port ${port}`);
});
