import { kafkaClient } from "../../shared/kafka";
import { OrderCreatedEvent } from "../events";
import { orderReadRepo, orderService } from "../services";

export const startOrderCreatedConsumer = async () => {
  const consumer = kafkaClient.consumer;
  await consumer.connect();
  await consumer.subscribe({
    topic: "OrderCreatedEvent",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const event: OrderCreatedEvent = JSON.parse(message.value.toString());

      console.log("Processing OrderCreatedEvent:", event);

      await orderService.saveOrder(event.eventData);
      await orderReadRepo.saveOrder(event.eventData);
    },
  });
};
