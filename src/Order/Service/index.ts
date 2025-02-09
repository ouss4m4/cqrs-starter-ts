import { OrderService } from "./order.service";
import { OrderEventService } from "./orderEvents.service";

const orderEventService = new OrderEventService();
const orderService = new OrderService();

export { orderEventService, orderService };
