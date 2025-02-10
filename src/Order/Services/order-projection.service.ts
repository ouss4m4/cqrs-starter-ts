import { AppDataSource } from "../../shared/db/datasource";
import { OrderEntity, OrderReadEntity } from "../entities";
import { Order } from "../Order";

export class OrderProjectionService {
  private ordeReadRepo = AppDataSource.getRepository(OrderReadEntity);
  async saveOrder(order: Order) {
    return await this.ordeReadRepo.save(order);
  }

  async findOrderById(orderId: string) {
    return await this.ordeReadRepo.findOneBy({ orderId });
  }
}
