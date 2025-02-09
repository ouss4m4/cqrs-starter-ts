import { BaseEvent } from "./event.base";

export abstract class EventHandler<T extends BaseEvent> {
  abstract handle(event: T): Promise<void>;
}
