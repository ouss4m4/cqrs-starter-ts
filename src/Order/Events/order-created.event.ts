import { Event } from "../../shared/cqrs/events/event.base";
import { Order } from "../Order";

export class OrderCreatedEvent implements Event {
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
