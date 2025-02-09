import { EventBus } from "../../shared/cqrs/events/event.bus";
import { OrderCreatedEventHandler } from "../EventHandlers/order-created.handler";
import { OrderCreatedEvent } from "./order-created.event";

const orderEventBus = new EventBus();

orderEventBus.registerHandler(OrderCreatedEvent, OrderCreatedEventHandler);

export { orderEventBus };
