import { Order } from "../Order";

export class OrderCanceledEvent {
  public createdAt: Date;
  public eventId: string;
  public eventType: string;
  public eventData: Order;
  public orderId: string;
  constructor(data: Order) {
    this.createdAt = new Date();
    this.eventId = crypto.randomUUID();
    this.eventType = "OrderCanceled";
    this.eventData = data;
    this.orderId = data.orderId;
  }
}
