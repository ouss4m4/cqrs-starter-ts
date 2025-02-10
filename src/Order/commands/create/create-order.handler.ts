import { Fail, Result, Success } from "../../../shared/core/Result";
import { CommandHandler } from "../../../shared/cqrs";
import { kafkaClient } from "../../../shared/kafka";
import { OrderCreatedEvent } from "../../events";
import { Order } from "../../Order";
import { orderEventService } from "../../services";
import { CreateOrderCommand } from "./create-order.command";

export class CreateOrderHandler extends CommandHandler<
  CreateOrderCommand,
  string,
  Error
> {
  async handle(command: CreateOrderCommand): Promise<Result<string, Error>> {
    try {
      const order = Order.Create(
        crypto.randomUUID(),
        command.userId,
        command.asset,
        command.orderType,
        command.price,
        command.quantity
      );

      const orderCreatedEvent = new OrderCreatedEvent(order);
      await orderEventService.saveOrderEvent(orderCreatedEvent);

      await kafkaClient.producer.send({
        topic: "OrderCreatedEvent",
        messages: [{ value: JSON.stringify(orderCreatedEvent) }],
      });

      return new Success<string>(order.orderId);
    } catch (error) {
      return new Fail(
        error instanceof Error ? error : new Error("Failed to create order")
      );
    }
  }
}
