import { CommandBus } from "./../shared/cqrs/command/command.bus";
import { CreateOrderCommand } from "./Create/createOrder.command";
import { CreateOrderHandler } from "./Create/createOrder.handler";

class OrderBus extends CommandBus {}

const orderBus = new OrderBus();
orderBus.registerHandler(CreateOrderCommand, CreateOrderHandler);

export { orderBus };
