import { Order } from "./../Order";
import { CommandHandler } from "../../shared/cqrs/command/command-handler.base";
import { Result } from "../../shared/cqrs/types/response";
import { CreateOrderCommand } from "./createOrder.command";

export class CreateOrderHandler extends CommandHandler<
  CreateOrderCommand,
  string
> {
  async handle(command: CreateOrderCommand): Promise<Result<string>> {
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
      return this.success(orderId);
    } catch (error) {
      return this.failure(
        error instanceof Error ? error : new Error("Failed to create order")
      );
    }
  }
}
