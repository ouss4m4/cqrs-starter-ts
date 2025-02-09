// src/shared/cqrs/errors/cqrs.error.ts
export class CQRSError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CQRSError";
  }
}

export class HandlerNotFoundError extends CQRSError {
  constructor(messageType: string) {
    super(`No handler registered for message type: ${messageType}`);
    this.name = "HandlerNotFoundError";
  }
}

export class HandlerAlreadyExistsError extends CQRSError {
  constructor(messageType: string) {
    super(`Handler already registered for message type: ${messageType}`);
    this.name = "HandlerAlreadyExistsError";
  }
}
