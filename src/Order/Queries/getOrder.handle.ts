import { QueryHandler } from "../../shared/cqrs/query/query-handler.base";
import { orderReadRepo } from "../Services";
import { Fail, Result, Success } from "../../shared/core/Result";
import { OrderReadEntity } from "../Entities";
import { GetOrderQuery } from "./getOrder.query";

export class GetOrderHandler extends QueryHandler<GetOrderQuery, any, Error> {
  async handle(query: GetOrderQuery): Promise<Result<OrderReadEntity, Error>> {
    try {
      const order = await orderReadRepo.findOrderById(query.orderId);
      if (!order) {
        return new Fail(new Error("Order not found"));
      }
      return new Success(order);
    } catch (error) {
      return new Fail(
        error instanceof Error ? error : new Error("Query failed")
      );
    }
  }
}
