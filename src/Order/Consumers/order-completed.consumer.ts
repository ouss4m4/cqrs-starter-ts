import { kafkaClient } from "../../shared/kafka";
import { OrderCompletedEvent } from "../events";
import { orderReadRepo, orderService } from "../services";

export const startOrderCompleteConsumer = async () => {
  const consumer = kafkaClient.consumer;

  await consumer.connect();
  await consumer.subscribe({
    topic: "OrderCompletedEvent",
    fromBeginning: false,
  });

  // await messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        key: message.key?.toString(),
        value: message.value?.toString(),
        headers: message.headers,
      });

      if (!message.value) return;
      const event: OrderCompletedEvent = JSON.parse(message.value.toString());

      console.log("Processing OrderCompletedEvent:", event.eventData);

      await orderService.updateOrder(event.eventData);
      await orderReadRepo.updateOrder(event.eventData);
    },
  });
};
