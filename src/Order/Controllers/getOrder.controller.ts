import { query, Request, Response } from "express";
import { BaseController } from "../../shared/core/BaseController";
import { GetOrderQuery } from "../Queries/getOrder.query";
import { OrderReadEntity } from "../Entities";
import { orderQueryBus } from "../Queries/orderQueries.bus";

class GetOrderController extends BaseController {
  public async executeImpl(req: Request, res: Response): Promise<void> {
    const orderId = req.params.id;

    if (!orderId) {
      this.fail(res, "OrderId missing");
      return;
    }

    const getQuery = new GetOrderQuery(orderId);

    let respOrError = await orderQueryBus.execute<
      GetOrderQuery,
      OrderReadEntity,
      Error
    >(getQuery);

    if (respOrError.isSuccess()) {
      this.ok(res, respOrError.value);
    } else {
      this.fail(res, respOrError.error.message);
    }
  }
}

export const getOrderController = new GetOrderController();
