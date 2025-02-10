import { OrderService } from "./order.service";
import { OrderEventService } from "./order-events.service";
import { OrderProjectionService } from "./order-projection.service";

const orderEventService = new OrderEventService();
const orderService = new OrderService();
const orderReadRepo = new OrderProjectionService();

export { orderEventService, orderService, orderReadRepo };
