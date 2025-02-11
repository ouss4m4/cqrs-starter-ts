import { CommandBus } from "../../shared/cqrs/command/command.bus";
import { CancelOrderCommand } from "./cancel/cancel-order.command";
import { CancelOrderHandler } from "./cancel/cancel-order.handler";
import { CompleteOrderCommand } from "./complete/complete-order.command";
import { CompleteOrderHandler } from "./complete/complete-order.handle";
import { CreateOrderCommand } from "./create/create-order.command";
import { CreateOrderHandler } from "./create/create-order.handler";

const orderBus = new CommandBus();
orderBus.registerHandler(CreateOrderCommand, CreateOrderHandler);
orderBus.registerHandler(CompleteOrderCommand, CompleteOrderHandler);
orderBus.registerHandler(CancelOrderCommand, CancelOrderHandler);

export { orderBus };
