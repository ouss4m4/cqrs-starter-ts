import { Order } from "./../Order";
import { CommandHandler } from "../../shared/cqrs/command/command-handler.base";
import { CreateOrderCommand } from "./createOrder.command";
import { Fail, Result, Success } from "../../shared/core/Result";

export class CreateOrderHandler extends CommandHandler<
  CreateOrderCommand,
  string,
  Error
> {
  async handle(command: CreateOrderCommand): Promise<Result<string, Error>> {
    try {
      // Command is already validated at this point
      const orderId = crypto.randomUUID();
      const order = Order.Create(
        orderId,
        command.userId,
        command.asset,
        command.orderType,
        command.price,
        command.quantity
      );

      // Save to repository
      console.log(`Save Event To EventStore`);
      console.log(`Send Event to KAFKA so consumer does the DB change`);
      return new Success<string>(orderId);
    } catch (error) {
      return new Fail(
        error instanceof Error ? error : new Error("Failed to create order")
      );
    }
  }
}
