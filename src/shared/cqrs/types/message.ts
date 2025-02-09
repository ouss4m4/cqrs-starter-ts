export abstract class Message {
  abstract readonly type: string;

  constructor(
    public readonly metadata: MessageMetadata = {
      timestamp: new Date(),
      correlationId: crypto.randomUUID(),
    }
  ) {}
}

export type MessageMetadata = {
  timestamp: Date;
  correlationId: string;
  causationId?: string;
  userId?: string;
};
