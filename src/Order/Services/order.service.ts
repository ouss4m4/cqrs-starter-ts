import { AppDataSource } from "../../shared/db/datasource";
import { OrderEntity } from "../Entities";
import { Order } from "../Order";

export class OrderService {
  async saveOrder(order: Order) {
    const orderRepo = AppDataSource.getRepository(OrderEntity);

    return await orderRepo.save(order);
  }
}
