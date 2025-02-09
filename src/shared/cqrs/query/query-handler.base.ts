import { Query } from "./query.base";

export type QueryResult<T> = {
  data: T;
  metadata?: Record<string, unknown>;
};

export abstract class QueryHandler<TQuery extends Query<TResult>, TResult> {
  abstract handle(query: TQuery): Promise<QueryResult<TResult>>;
}
