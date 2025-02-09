import {
  HandlerNotFoundError,
  HandlerAlreadyExistsError,
} from "../errors/cqrs.error";
import { Result } from "../types/response";
import { Command } from "./command.base";
import { CommandHandler } from "./command-handler.base";

export class CommandBus {
  private handlers = new Map<
    new (...args: any[]) => Command,
    new () => CommandHandler<any, any>
  >();

  registerHandler<TCommand extends Command, TResult>(
    command: new (...args: any[]) => TCommand,
    handlerClass: new () => CommandHandler<TCommand, TResult>
  ): void {
    if (this.handlers.has(command)) {
      throw new HandlerAlreadyExistsError(command.name);
    }
    this.handlers.set(command, handlerClass);
  }

  async execute<TCommand extends Command, TResult>(
    command: TCommand
  ): Promise<Result<TResult>> {
    const HandlerClass = this.handlers.get(
      command.constructor as new (...args: any[]) => Command
    );
    if (!HandlerClass) {
      throw new HandlerNotFoundError(command.constructor.name);
    }

    try {
      const handler = new HandlerClass();
      return await handler.handle(command);
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error : new Error("Unknown error occurred"),
      };
    }
  }
}
