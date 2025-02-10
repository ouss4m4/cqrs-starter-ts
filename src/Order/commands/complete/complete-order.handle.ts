import { Fail, Result, Success } from "../../../shared/core/Result";
import { CommandHandler } from "../../../shared/cqrs";
import { kafkaClient } from "../../../shared/kafka";
import { OrderCompletedEvent } from "../../events";
import { orderEventService, orderService } from "../../services";
import { CompleteOrderCommand } from "./complete-order.command";

export class CompleteOrderHandler extends CommandHandler<
  CompleteOrderCommand,
  string,
  Error
> {
  async handle(command: CompleteOrderCommand): Promise<Result<string, Error>> {
    const orderOrError = await orderService.findOneById(command.orderId);
    if (orderOrError.isFail()) {
      return new Fail(new Error("Order not found"));
    }

    const order = orderOrError.value;
    try {
      order.complete();

      const orderCompletedEvent = new OrderCompletedEvent(order);
      await orderEventService.saveOrderEvent(orderCompletedEvent);

      await kafkaClient.producer.send({
        topic: "OrderCompletedEvent",
        messages: [{ value: JSON.stringify(orderCompletedEvent) }],
      });

      return new Success<string>(order.orderId);
    } catch (error) {
      return new Fail(
        error instanceof Error
          ? error
          : new Error("CompleteOrderHandler: Failed to complete order")
      );
    }
  }
}
