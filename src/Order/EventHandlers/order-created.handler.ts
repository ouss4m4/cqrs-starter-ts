import { EventHandler } from "../../shared/cqrs/events/event-handler.base";
import { OrderCreatedEvent } from "../Events/order-created.event";

export class OrderCreatedEventHandler extends EventHandler<OrderCreatedEvent> {
  async handle(event: OrderCreatedEvent): Promise<void> {
    console.log(
      `Handled event: ${event.eventType} for order ${event.eventData.orderId}`
    );
  }
}
