import { startOrderCompleteConsumer } from "./order-completed.consumer";
import { startOrderCreatedConsumer } from "./order-created.consumer";

export const registerOrderConsumer = async () => {
  // Start Kafka consumers
  startOrderCreatedConsumer();
  startOrderCompleteConsumer();
  console.log("Consumers started successfully!");
};
