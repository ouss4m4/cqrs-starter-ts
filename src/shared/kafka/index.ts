import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

export const kafkaClient = {
  producer: kafka.producer(),
  consumer: kafka.consumer({ groupId: "order-events" }),
};

export async function startKafka() {
  await kafkaClient.producer.connect();
}
