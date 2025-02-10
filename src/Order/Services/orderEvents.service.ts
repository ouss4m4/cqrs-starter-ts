import { AppDataSource } from "../../shared/db/datasource";
import { OrderEventEntity } from "../Entities";
import { OrderCreatedEvent } from "../Events/order-created.event";

export class OrderEventService {
  async saveOrderEvent(orderData: OrderCreatedEvent) {
    const orderRepo = AppDataSource.getRepository(OrderEventEntity);

    return await orderRepo.save(orderData);
  }
}

