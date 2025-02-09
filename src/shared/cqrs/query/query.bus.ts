import {
  HandlerNotFoundError,
  HandlerAlreadyExistsError,
} from "../errors/cqrs.error";
import { Query } from "./query.base";
import { QueryHandler, QueryResult } from "./query-handler.base";

export class QueryBus {
  private handlers = new Map<string, new () => QueryHandler<any, any>>();

  registerHandler<TQuery extends Query<TResult>, TResult>(
    queryType: string,
    handlerClass: new () => QueryHandler<TQuery, TResult>
  ): void {
    if (this.handlers.has(queryType)) {
      throw new HandlerAlreadyExistsError(queryType);
    }
    this.handlers.set(queryType, handlerClass);
  }

  async execute<TQuery extends Query<TResult>, TResult>(
    query: TQuery
  ): Promise<QueryResult<TResult>> {
    const HandlerClass = this.handlers.get(query.type);
    if (!HandlerClass) {
      throw new HandlerNotFoundError(query.type);
    }

    const handler = new HandlerClass();
    return handler.handle(query);
  }
}
