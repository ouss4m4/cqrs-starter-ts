import { Fail, Result, Success } from "../../shared/core/Result";
import { CreateOrderCommand } from "../Commands/createOrder.command";
import { ORDER_TYPE_MAP, OrderTypeString } from "../order.types";

export class CreateOrderDTO {
  userId: string;
  asset: string;
  orderType: string;
  price: number;
  quantity: number;
  private constructor(
    userId: string,
    asset: string,
    orderType: string,
    price: number,
    quantity: number
  ) {
    this.userId = userId;
    this.asset = asset;
    this.orderType = orderType;
    this.price = price;
    this.quantity = quantity;
  }

  static validate(data: any): Result<CreateOrderDTO, Error> {
    const errors: string[] = [];

    if (!data) {
      errors.push("Request body is required");
    } else {
      if (!data.userId) errors.push("userId is required");
      if (!data.asset) errors.push("asset is required");
      if (!data.type || typeof data.type !== "string")
        errors.push("Order type must be a string");
      if (typeof data.price !== "number") errors.push("Price must be a number");
      if (typeof data.quantity !== "number")
        errors.push("Quantity must be a number");

      const orderType = data.type?.toUpperCase();
      if (orderType && !["BUY", "SELL"].includes(orderType)) {
        errors.push("Order type must be either BUY or SELL");
      }
    }

    if (errors.length > 0) {
      return new Fail(new Error(errors.join(", ")));
    }

    return new Success(
      new CreateOrderDTO(
        data.userId,
        data.asset,
        data.type,
        data.price,
        data.quantity
      )
    );
  }

  static toCommand(dto: CreateOrderDTO): Result<CreateOrderCommand, Error> {
    try {
      return new Success(
        new CreateOrderCommand(
          dto.userId,
          dto.asset,
          ORDER_TYPE_MAP[dto.orderType.toUpperCase() as OrderTypeString],
          dto.price,
          dto.quantity
        )
      );
    } catch (error) {
      return new Fail(
        error instanceof Error ? error : new Error("Unexpected Error")
      );
    }
  }
}
