export abstract class BaseEvent {
  public readonly createdAt: Date;

  // Unique identifier for the event (optional, can be set by an event publisher like Kafka)
  public readonly eventId: string;

  // Name or type of the event (e.g., "OrderCreated", "OrderUpdated")
  public abstract readonly eventType: string;

  constructor() {
    this.eventId = crypto.randomUUID();
    this.createdAt = new Date();
  }
}
