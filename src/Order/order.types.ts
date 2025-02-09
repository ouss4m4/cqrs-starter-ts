import { CreateOrderCommand } from "./Commands/createOrder.command";

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
export enum OrderType {
  BUY = 1,
  SELL = 2,
}

const ORDER_TYPE_MAP = {
  BUY: OrderType.BUY,
  SELL: OrderType.SELL,
} as const;

type OrderTypeString = keyof typeof ORDER_TYPE_MAP;

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

  static validate(data: any): CreateOrderDTO {
    if (!data) throw new Error("Request body is required");
    if (!data.userId) throw new Error("userId is required");
    if (!data.asset) throw new Error("asset is required");
    if (typeof data.type !== "string")
      throw new Error("Order type must be a string");
    if (typeof data.price !== "number")
      throw new Error("Price must be a number");
    if (typeof data.quantity !== "number")
      throw new Error("Quantity must be a number");

    const orderType = data.type.toUpperCase();
    if (!["BUY", "SELL"].includes(orderType)) {
      throw new Error("Order type must be either BUY or SELL");
    }

    return new CreateOrderDTO(
      data.userId,
      data.asset,
      data.type,
      data.price,
      data.quantity
    );
  }

  static toCommand(dto: CreateOrderDTO): CreateOrderCommand {
    return new CreateOrderCommand(
      dto.userId,
      dto.asset,
      ORDER_TYPE_MAP[dto.orderType.toUpperCase() as OrderTypeString],
      dto.price,
      dto.quantity
    );
  }
}
