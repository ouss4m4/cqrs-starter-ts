import { OrderEntity } from "./entities/order.entity";
import { OrderStatus, OrderType } from "./order.types";

export class Order {
  public orderId: string;
  public userId: string;
  public asset: string;
  public type: OrderType;
  public price: number;
  public quantity: number;
  public status: OrderStatus;
  public createdAt: Date;
  public updatedAt: Date;

  private constructor(
    orderId: string,
    userId: string,
    asset: string,
    type: OrderType,
    price: number,
    quantity: number,
    status: OrderStatus = OrderStatus.PENDING,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.orderId = orderId;
    this.userId = userId;
    this.asset = asset;
    this.type = type;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getStatus() {
    return this.status;
  }

  cancel() {
    if (this.status != OrderStatus.PENDING) {
      throw new Error("Only pending orders can be canceled");
    }
    this.status = OrderStatus.CANCELED;
    this.updatedAt = new Date();
  }

  complete() {
    if (this.status != OrderStatus.PENDING) {
      throw new Error("Only pending orders can be fullfiled");
    }
    this.status = OrderStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  static Create(
    orderId: string,
    userId: string,
    asset: string,
    type: OrderType,
    price: number,
    quantity: number,
    status: OrderStatus = OrderStatus.PENDING
  ) {
    const now = new Date();
    return new Order(
      orderId,
      userId,
      asset,
      type,
      price,
      quantity,
      status,
      now,
      now
    );
  }

  static fromPersistance(data: OrderEntity): Order {
    return new Order(
      data.orderId,
      data.userId,
      data.asset,
      data.type,
      data.price,
      data.quantity,
      data.status,
      data.createdAt,
      data.updatedAt
    );
  }
}
