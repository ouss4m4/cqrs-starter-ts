import { CommandBus } from "../../shared/cqrs/command/command.bus";
import { CreateOrderCommand } from "./createOrder.command";
import { CreateOrderHandler } from "./createOrder.handler";

const orderBus = new CommandBus();
orderBus.registerHandler(CreateOrderCommand, CreateOrderHandler);

export { orderBus };
