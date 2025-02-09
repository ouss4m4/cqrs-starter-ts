import { Result, Success } from "../../shared/core/Result";
import { EventHandler } from "../../shared/cqrs/events/event-handler.base";
import { OrderCreatedEvent } from "../Events/order-created.event";
import { orderService } from "../Service";

export class OrderCreatedEventHandler extends EventHandler<
  OrderCreatedEvent,
  string,
  Error
> {
  async handle(event: OrderCreatedEvent): Promise<Result<string, Error>> {
    console.log(`---------------\n 
      ${event}\m
      ----------------
      `);
    orderService.saveOrder(event.eventData);

    
    return new Success("done");
  }
}
