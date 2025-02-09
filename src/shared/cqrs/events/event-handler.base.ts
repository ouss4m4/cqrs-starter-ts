import { Result } from "../../core/Result";
import { BaseEvent } from "./event.base";

export abstract class EventHandler<T extends BaseEvent, TResult, TError> {
  abstract handle(event: T): Promise<Result<TResult, TError>>;
}
