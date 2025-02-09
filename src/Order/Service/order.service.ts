import { AppDataSource } from "../../shared/db/datasource";
import { OrderEntity } from "../Entities";
import { Order } from "../Order";

export class OrderService {
  async createOrder(orderData: Order) {
    const orderRepo = AppDataSource.getRepository(OrderEntity);

    return await orderRepo.save(orderData);
  }
}
