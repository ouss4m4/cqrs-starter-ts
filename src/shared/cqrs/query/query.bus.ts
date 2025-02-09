import { Query } from "./query.base";
import { QueryHandler } from "./query-handler.base";

export class QueryBus {
  private handlers: Map<string, QueryHandler<any, any, any>> = new Map();

  register<Q extends Query, R, E extends Error>(
    queryType: new (...args: any[]) => Q,
    handler: QueryHandler<Q, R, E>
  ) {
    this.handlers.set(queryType.name, handler);
  }

  async execute<Q extends Query, R, E extends Error>(query: Q) {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new Error(`No handler found for query: ${query.constructor.name}`);
    }
    return handler.handle(query);
  }
}

// export const queryBus = new QueryBus();
