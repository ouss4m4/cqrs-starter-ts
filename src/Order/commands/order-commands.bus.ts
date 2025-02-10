import { CommandBus } from "../../shared/cqrs/command/command.bus";
import { CreateOrderCommand } from "./create-order.command";
import { CreateOrderHandler } from "./create-order.handler";

const orderBus = new CommandBus();
orderBus.registerHandler(CreateOrderCommand, CreateOrderHandler);

export { orderBus };
