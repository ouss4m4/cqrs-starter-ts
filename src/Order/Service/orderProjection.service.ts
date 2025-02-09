import { AppDataSource } from "../../shared/db/datasource";
import { OrderEntity, OrderReadEntity } from "../Entities";
import { Order } from "../Order";

export class OrderProjectionService {
  async saveOrder(order: Order) {
    const ordeReadRepo = AppDataSource.getRepository(OrderReadEntity);

    return await ordeReadRepo.save(order);
  }
}
