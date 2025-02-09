import { Request, Response } from "express";
import { BaseController } from "../shared/core/BaseController";
import { CreateOrderDTO } from "./order.types";

export class CreateItemController extends BaseController {
  public async executeImpl(req: Request, res: Response): Promise<void> {
    const dto = CreateOrderDTO.validate(req.body);
    const command = CreateOrderDTO.toCommand(dto);
    
    // let result = await orderBus.execute<CreateOrderCommand, Result<string>>(
    //   command
    // );
    // if (respOrError.isSuccess()) {
    //   this.ok(res, respOrError.value);
    // } else {
    //   this.fail(res, respOrError.error.message);
    // }
  }
}

// itemsRouter.post("/", (req, res) => createItemController.execute(req, res));
