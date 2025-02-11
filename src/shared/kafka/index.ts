import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

export const kafkaClient = {
  producer: kafka.producer(),
  consumer: kafka.consumer({ groupId: "order-events", heartbeatInterval: 0 }),
};

export async function startKafka() {
  await kafkaClient.producer.connect();
}
