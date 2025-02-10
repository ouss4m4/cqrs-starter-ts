import { Query } from "../../shared/cqrs/query/query.base";

export class GetOrderQuery extends Query {
  constructor(public readonly orderId: string) {
    super();
  }
}
