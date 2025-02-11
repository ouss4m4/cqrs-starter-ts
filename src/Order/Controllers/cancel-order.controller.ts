import { Request, Response } from "express";
import { BaseController } from "../../shared/core/BaseController";
import { orderBus } from "../commands/order-commands.bus";
import { CancelOrderCommand } from "../commands/cancel/cancel-order.command";

class CancelOrderController extends BaseController {
  public async executeImpl(req: Request, res: Response): Promise<void> {
    const orderId = req.params.id;
    const userId = crypto.randomUUID(); // req.user.id
    if (!orderId) {
      this.fail(res, "Order id is required");
      return;
    }

    const command = new CancelOrderCommand(orderId, userId);

    let respOrError = await orderBus.execute<CancelOrderCommand, string, Error>(
      command
    );

    if (respOrError.isSuccess()) {
      this.ok(res, respOrError.value);
    } else {
      this.fail(res, respOrError.error.message);
    }
  }
}

export const cancelOrderController = new CancelOrderController();
