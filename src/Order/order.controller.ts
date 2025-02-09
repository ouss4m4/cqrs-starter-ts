import { Request, Response } from "express";
import { CreateOrderCommand } from "./Commands/createOrder.command";
import { CreateOrderDTO } from "./order.types";
import { orderBus } from "./order.bus";
import { Result } from "../shared/cqrs";

export class OrderController {
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const dto = CreateOrderDTO.validate(req.body);
      const command = CreateOrderDTO.toCommand(dto);

      let result = await orderBus.execute<CreateOrderCommand, Result<string>>(
        command
      );

      res.status(202).json(result);
      return;
    } catch (error) {
      let message = "Unexpected Error Happened";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        success: false,
        message,
      });
    }
  }
}
