import { Command } from "../../../shared/cqrs";

export class CompleteOrderCommand extends Command {
  readonly type = "COMPLETE_ORDER";
  readonly module = "orders";

  constructor(public readonly orderId: string, public readonly userId: string) {
    super();
    this.validate();
  }

  private validate(): void {
    if (!this.userId) throw new Error("UserId is required");
  }
}
