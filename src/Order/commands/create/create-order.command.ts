import { Command } from "../../../shared/cqrs";
import { OrderType } from "../../order.types";

export class CreateOrderCommand extends Command {
  readonly type = "CREATE_ORDER";
  readonly module = "orders";

  constructor(
    public readonly userId: string,
    public readonly asset: string,
    public readonly orderType: OrderType,
    public readonly price: number,
    public readonly quantity: number
  ) {
    super();
    this.validate();
  }

  private validate(): void {
    if (!this.userId) throw new Error("UserId is required");
    if (!this.asset) throw new Error("Asset is required");
    if (this.price <= 0) throw new Error("Price must be greater than 0");
    if (this.quantity <= 0) throw new Error("Quantity must be greater than 0");
  }
}
