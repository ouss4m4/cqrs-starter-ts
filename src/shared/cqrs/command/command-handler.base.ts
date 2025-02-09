import { Result } from '../types/response';
import { Command } from './command.base';

export abstract class CommandHandler<TCommand extends Command, TResult = void> {
  abstract handle(command: TCommand): Promise<Result<TResult>>;
  
  protected success<T>(data?: T, metadata?: Record<string, unknown>): Result<T> {
    return { success: true, data, metadata };
  }

  protected failure(error: Error, metadata?: Record<string, unknown>): Result<never> {
    return { success: false, error, metadata };
  }
}