import { AppDataSource } from "../../shared/db/datasource";
import { OrderEventEntity } from "../entities";
import { OrderCreatedEvent } from "../events/order-created.event";

export class OrderEventService {
  async saveOrderEvent(orderData: OrderCreatedEvent) {
    const orderRepo = AppDataSource.getRepository(OrderEventEntity);

    return await orderRepo.save(orderData);
  }
}
