import {
  HandlerNotFoundError,
  HandlerAlreadyExistsError,
} from "../errors/cqrs.error";
import { Command } from "./command.base";
import { CommandHandler } from "./command-handler.base";
import { Result } from "../../core/Result";

export class CommandBus {
  private handlers = new Map<
    new (...args: any[]) => Command,
    new () => CommandHandler<Command, any, any>
  >();

  registerHandler<TCommand extends Command, TResult>(
    command: new (...args: any[]) => TCommand,
    handlerClass: new () => CommandHandler<TCommand, TResult, Error>
  ): void {
    if (this.handlers.has(command)) {
      throw new HandlerAlreadyExistsError(command.name);
    }
    this.handlers.set(command, handlerClass);
  }

  async execute<TCommand extends Command, TResult, TError>(
    command: TCommand
  ): Promise<Result<TResult, TError>> {
    const HandlerClass = this.handlers.get(
      command.constructor as new (...args: any[]) => Command
    );
    if (!HandlerClass) {
      throw new HandlerNotFoundError(command.constructor.name);
    }

    const handler = new HandlerClass();
    return await handler.handle(command);
  }
}
