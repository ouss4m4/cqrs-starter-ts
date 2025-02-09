import { Result } from "../../core/Result";
import { Command } from "./command.base";

export abstract class CommandHandler<
  TCommand extends Command,
  TResult,
  TError
> {
  abstract handle(command: TCommand): Promise<Result<TResult, TError>>;
}
