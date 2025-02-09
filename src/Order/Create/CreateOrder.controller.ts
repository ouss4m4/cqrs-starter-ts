import { Request, Response } from "express";
import { BaseController } from "../../shared/core/BaseController";
import { orderBus } from "../order.bus";
import { CreateOrderDTO } from "./createOrder.dto";
import { CreateOrderCommand } from "./createOrder.command";

class CreateOrderController extends BaseController {
  public async executeImpl(req: Request, res: Response): Promise<void> {
    const dto = CreateOrderDTO.validate(req.body);

    if (dto.isFail()) {
      this.fail(res, dto.error);
      return;
    }

    const command = CreateOrderDTO.toCommand(dto.value);
    if (command.isFail()) {
      this.fail(res, command.error);
      return;
    }

    let respOrError = await orderBus.execute<CreateOrderCommand, string, Error>(
      command.value
    );

    if (respOrError.isSuccess()) {
      this.ok(res, respOrError.value);
    } else {
      this.fail(res, respOrError.error.message);
    }
  }
}

export const createOrderController = new CreateOrderController();
