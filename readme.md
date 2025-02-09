# CQRS Trading System Example

This project demonstrates a CQRS (Command Query Responsibility Segregation) architecture implementation in TypeScript, using a trading system as an example.

## Implementation Flow

### 1. Controller Layer

```typescript
class CreateOrderController extends BaseController {
  async executeImpl(req: Request, res: Response): Promise<void> {
    // Validate request body and create DTO
    const dto = CreateOrderDTO.validate(req.body);
    if (dto.isFail()) {
      this.fail(res, dto.error);
      return;
    }

    // Convert DTO to Command
    const command = CreateOrderDTO.toCommand(dto.value);
    if (command.isFail()) {
      this.fail(res, command.error);
      return;
    }

    // Execute command and handle response
    let respOrError = await orderBus.execute<CreateOrderCommand, string, Error>(
      command.value
    );

    if (respOrError.isSuccess()) {
      this.ok(res, respOrError.value);
    } else {
      this.fail(res, respOrError.error.message);
    }
  }
}
```

### 2. DTO Layer - Validation and Command Creation

```typescript
class CreateOrderDTO {
  static toCommand(dto: CreateOrderDTO): Result<CreateOrderCommand, Error> {
    try {
      return new Success(
        new CreateOrderCommand(
          dto.userId,
          dto.asset,
          ORDER_TYPE_MAP[dto.orderType.toUpperCase()],
          dto.price,
          dto.quantity
        )
      );
    } catch (error) {
      return new Fail(
        error instanceof Error ? error : new Error("Unexpected Error")
      );
    }
  }
}
```

### 3. Domain Model

```typescript
class Order {
  static Create(
    orderId: string,
    userId: string,
    asset: string,
    type: OrderType,
    price: number,
    quantity: number,
    status: OrderStatus = OrderStatus.PENDING
  ) {
    const now = new Date();
    return new Order(
      orderId,
      userId,
      asset,
      type,
      price,
      quantity,
      status,
      now,
      now
    );
  }
}
```

### 4. Command Layer

```typescript
class CreateOrderCommand extends Command {
  readonly type = "CREATE_ORDER";
  readonly module = "orders";

  constructor(
    public readonly userId: string,
    public readonly asset: string,
    public readonly orderType: OrderType,
    public readonly price: number,
    public readonly quantity: number
  ) {
    super();
    this.validate();
  }

  private validate(): void {
    if (!this.userId) throw new Error("UserId is required");
    if (!this.asset) throw new Error("Asset is required");
    if (this.price <= 0) throw new Error("Price must be greater than 0");
    if (this.quantity <= 0) throw new Error("Quantity must be greater than 0");
  }
}
```

### 5. Command Handler

```typescript
class CreateOrderHandler extends CommandHandler<
  CreateOrderCommand,
  string,
  Error
> {
  async handle(command: CreateOrderCommand): Promise<Result<string, Error>> {
    try {
      const orderId = crypto.randomUUID();
      const order = Order.Create(
        orderId,
        command.userId,
        command.asset,
        command.orderType,
        command.price,
        command.quantity
      );

      // Create and persist event
      const orderCreatedEvent = new OrderCreatedEvent(order);
      await orderEventService.saveOrderEvent(orderCreatedEvent);

      // Publish event
      await orderEventBus.execute(orderCreatedEvent);

      return new Success<string>(orderId);
    } catch (error) {
      return new Fail(
        error instanceof Error ? error : new Error("Failed to create order")
      );
    }
  }
}
```

### 6. Event Layer

```typescript
class OrderCreatedEvent implements BaseEvent {
  public createdAt: Date;
  public eventId: string;
  public eventType: string;
  public eventData: Order;
  public orderId: string;

  constructor(data: Order) {
    this.createdAt = new Date();
    this.eventId = crypto.randomUUID();
    this.eventType = "OrderCreated";
    this.eventData = data;
    this.orderId = data.orderId;
  }
}
```

### 7. Event Handler

```typescript
class OrderCreatedEventHandler extends EventHandler<
  OrderCreatedEvent,
  string,
  Error
> {
  async handle(event: OrderCreatedEvent): Promise<Result<string, Error>> {
    // Persist order to database
    await orderService.saveOrder(event.eventData);
    return new Success("done");
  }
}
```

## Key Features

1. **Strong Validation**: Multiple layers of validation (DTO, Command)
2. **Event Sourcing**: All changes are first recorded as events
3. **Separation of Concerns**: Clear boundaries between validation, command handling, and event handling
4. **Error Handling**: Comprehensive error handling using Result type
5. **Domain-Driven Design**: Strong domain model with business rules encapsulation

```

```
