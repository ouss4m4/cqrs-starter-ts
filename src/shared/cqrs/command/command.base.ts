import { Message, MessageMetadata } from "../types/message";

export abstract class Command extends Message {
  abstract readonly module: string;
}
