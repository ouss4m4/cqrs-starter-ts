import { Fail, Result, Success } from "../../../shared/core/Result";
import { CommandHandler } from "../../../shared/cqrs";
import { CancelOrderCommand } from "./cancel-order.command";
import { orderEventService, orderService } from "../../services";
import { kafkaClient } from "../../../shared/kafka";
import { OrderCanceledEvent } from "../../events";

export class CancelOrderHandler extends CommandHandler<
  CancelOrderCommand,
  string,
  Error
> {
  async handle(command: CancelOrderCommand): Promise<Result<string, Error>> {
    const resOrError = await orderService.findOneById(command.orderId);
    if (resOrError.isFail()) {
      return new Fail(resOrError.error);
    }

    try {
      const order = resOrError.value;
      order.cancel();

      const orderCancelEvent = new OrderCanceledEvent(order);
      await orderEventService.saveOrderEvent(orderCancelEvent);

      await kafkaClient.producer.send({
        topic: "OrderCanceledEvent",
        messages: [{ value: JSON.stringify(orderCancelEvent) }],
      });

      return new Success<string>(order.orderId);
    } catch (error) {
      return new Fail(
        error instanceof Error
          ? error
          : new Error("CancelOrderHandler: failed to cancel")
      );
    }
  }
}
