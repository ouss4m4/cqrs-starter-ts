import { OrderStatus, OrderType } from "./order.types";

export class Order {
  private orderId: string;
  private userId: string;
  private asset: string;
  private type: OrderType;
  private price: number;
  private quantity: number;
  private status: OrderStatus;

  private constructor(
    orderId: string,
    userId: string,
    asset: string,
    type: OrderType,
    price: number,
    quantity: number,
    status: OrderStatus = OrderStatus.PENDING
  ) {
    this.orderId = orderId;
    this.userId = userId;
    this.asset = asset;
    this.type = type;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  cancel() {
    if (this.status != OrderStatus.PENDING) {
      throw new Error("Only pending orders can be canceled");
    }
    this.status = OrderStatus.CANCELED;
  }

  complete() {
    if (this.status != OrderStatus.PENDING) {
      throw new Error("Only pending orders can be fullfiled");
    }
    this.status = OrderStatus.COMPLETED;
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
    return new Order(orderId, userId, asset, type, price, quantity, status);
  }
}

// const orderA = Order.Create(
//   crypto.randomUUID(),
//   crypto.randomUUID(),
//   "BTC/USDT",
//   OrderType.BUY,
//   87430,
//   1
// );
