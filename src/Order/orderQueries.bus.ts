import { QueryBus } from "../shared/cqrs";
import { GetOrderHandler } from "./Query/getOrder.handle";
import { GetOrderQuery } from "./Query/getOrder.query";

const orderQueryBus = new QueryBus();
orderQueryBus.register(GetOrderQuery, new GetOrderHandler());

export { orderQueryBus };
