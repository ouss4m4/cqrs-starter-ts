import { CreateOrderHandler } from "./Commands/createOrder.handler";
import { CreateOrderCommand } from "./Commands/createOrder.command";
import { CommandBus } from "./../shared/cqrs/command/command.bus";
import { OrderType } from "./order.types";
class OrderBus extends CommandBus {}

const orderBus = new OrderBus();
orderBus.registerHandler(CreateOrderCommand, CreateOrderHandler);

export { orderBus };
