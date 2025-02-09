import { Message } from '../types/message';

export abstract class Query<TResult> extends Message {
  abstract readonly module: string;
}
