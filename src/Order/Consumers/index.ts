import { startOrderCreatedConsumer } from "./order-created.consumer";

export const registerOrderConsumer = async () => {
  // Start Kafka consumers
  startOrderCreatedConsumer();

  console.log("Consumers started successfully!");
};
