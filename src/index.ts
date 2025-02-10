import { connectDb } from "./shared/db";
import { startKafka } from "./shared/kafka";
import { registerOrderConsumer } from "./Order/Consumers";
import { startExpressServer } from "./shared/http";

const bootstrapApplication = async () => {
  startExpressServer();
  connectDb();
  startKafka();
  registerOrderConsumer();
};

bootstrapApplication();
