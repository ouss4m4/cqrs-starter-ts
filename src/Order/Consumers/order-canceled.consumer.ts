import { kafkaClient } from "../../shared/kafka";
import { OrderCanceledEvent } from "../events";
import { orderReadRepo, orderService } from "../services";

export const startOrderCancelConsumer = async () => {
  const consumer = kafkaClient.consumer;

  await consumer.connect();
  await consumer.subscribe({
    topic: "OrderCanceledEvent",
    fromBeginning: true,
  });

  // await messages
  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const event: OrderCanceledEvent = JSON.parse(message.value.toString());

      console.log("Processing OrderCanceledEvent:", event.eventData);

      await orderService.updateOrder(event.eventData);
      await orderReadRepo.updateOrder(event.eventData);
    },
  });
};
