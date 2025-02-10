import { QueryBus } from "../../shared/cqrs";
import { GetOrderHandler } from "./getOrder.handle";
import { GetOrderQuery } from "./getOrder.query";

const orderQueryBus = new QueryBus();
orderQueryBus.register(GetOrderQuery, new GetOrderHandler());

export { orderQueryBus };
