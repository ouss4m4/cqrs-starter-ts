import { Result } from "../../core/Result";
import { Query } from "./query.base";

export abstract class QueryHandler<
  Q extends Query,
  TResult,
  TError extends Error
> {
  abstract handle(query: Q): Promise<Result<TResult, TError>>;
}
