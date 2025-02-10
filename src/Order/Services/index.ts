import { OrderService } from "./order.service";
import { OrderEventService } from "./orderEvents.service";
import { OrderProjectionService } from "./orderProjection.service";

const orderEventService = new OrderEventService();
const orderService = new OrderService();
const orderReadRepo = new OrderProjectionService();

export { orderEventService, orderService, orderReadRepo };
