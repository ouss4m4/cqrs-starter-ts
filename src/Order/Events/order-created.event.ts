import { Order } from "../Order";

export class OrderCreatedEvent {
  public createdAt: Date;
  public eventId: string;
  public eventType: string;
  public eventData: Order;
  public orderId: string;
  constructor(data: Order) {
    this.createdAt = new Date();
    this.eventId = crypto.randomUUID();
    this.eventType = "OrderCreated";
    this.eventData = data;
    this.orderId = data.orderId;
  }
}
