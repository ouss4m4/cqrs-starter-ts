import { BaseEvent } from "../../shared/cqrs/events/event.base";
import { Order } from "../Order";

export class OrderCompletedEvent implements BaseEvent {
  public createdAt: Date;
  public eventId: string;
  public eventType: string;
  public eventData: Order;
  public orderId: string;
  constructor(data: Order) {
    this.createdAt = new Date();
    this.eventId = crypto.randomUUID();
    this.eventType = "OrderCompleted";
    this.eventData = data;
    this.orderId = data.orderId;
  }
}
