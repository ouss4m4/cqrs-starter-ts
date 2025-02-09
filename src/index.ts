import express, { json } from "express";
import { ordersRouter } from "./Order/Create";
import { connectDb } from "./shared/db";
import { startKafka } from "./shared/kafka";
import { registerOrderConsumer } from "./Order/Consumers";

const app = express();
app.use(json());

const port = process.env.PORT || 3001;

app.use("/orders", ordersRouter);

app.listen(port, async () => {
  // kafka boostrap
  await connectDb();
  await startKafka();
  await registerOrderConsumer();

  console.log(`Up and running on port ${port}`);
});
