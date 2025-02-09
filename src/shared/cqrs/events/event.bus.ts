import { Result } from "../../core/Result";
import { EventHandler } from "./event-handler.base";
import { BaseEvent } from "./event.base";

export class EventBus {
  private eventHandlers = new Map<
    new (...args: any[]) => BaseEvent,
    new () => EventHandler<BaseEvent, any, any>
  >();

  registerHandler<TEvent extends BaseEvent, TResult>(
    event: new (...args: any[]) => TEvent,
    eventHandler: new () => EventHandler<TEvent, TResult, Error>
  ): void {
    if (this.eventHandlers.has(event)) {
      throw new Error(`Event Handler already registered for : ${event.name}`);
    }

    this.eventHandlers.set(event, eventHandler);
  }

  async execute<TEvent extends BaseEvent, TResult, TError>(
    event: TEvent
  ): Promise<Result<TResult, TError>> {
    const HandlerClass = this.eventHandlers.get(
      event.constructor as new (...args: any[]) => BaseEvent
    );
    if (!HandlerClass) {
      throw new Error(
        `No Event Handler registered for : ${event.constructor.name}`
      );
    }

    const handler = new HandlerClass();
    return await handler.handle(event);
  }
}
