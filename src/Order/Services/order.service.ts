import { Success } from "./../../shared/core/Result";
import { Fail, Result } from "../../shared/core/Result";
import { AppDataSource } from "../../shared/db/datasource";
import { OrderEntity } from "../entities";
import { Order } from "../Order";

export class OrderService {
  private orderRepo = AppDataSource.getRepository(OrderEntity);

  async saveOrder(order: Order) {
    return await this.orderRepo.save(order);
  }

  async updateOrder(order: Order) {
    return await this.orderRepo.update(order.orderId, order);
  }
  async findOneById(orderId: string): Promise<Result<Order, Error>> {
    const entity = await this.orderRepo.findOneBy({ orderId });
    if (!entity) {
      return new Fail(new Error("Order not found"));
    }

    return new Success(Order.fromPersistance(entity));
  }
}
