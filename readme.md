# Order Matching Engine with CQRS

A sophisticated order matching engine built using CQRS (Command Query Responsibility Segregation) pattern and Event Sourcing.

## Technology Stack & Infrastructure

### Backend Technologies

- Node.js with TypeScript
- Express.js for REST API
- TypeORM for database operations
- PostgreSQL for data persistence
- Apache Kafka for event streaming
- Docker & Docker Compose for containerization

### Infrastructure Components

1. **PostgreSQL Database**

   - Handles both write and read models
   - Stores order events, order state, and read projections

2. **Apache Kafka**

   - Event streaming platform for order events
   - Uses Zookeeper for cluster management
   - Handles event distribution between services

3. **Docker Services**
   - PostgreSQL container
   - Kafka container
   - Zookeeper container
   - All services configured via docker-compose

## Architecture

The application follows CQRS pattern with Event Sourcing:

### Core Components

1. **Command Side (Write Model)**

   - Handles order creation, modification, and state changes
   - Validates business rules
   - Generates events
   - Updates write model

2. **Query Side (Read Model)**

   - Provides optimized data models for querying
   - Maintains denormalized views
   - Handles order status queries

3. **Event Store**
   - Stores all order events
   - Provides event replay capability
   - Ensures event consistency

### Event Flow

1. Command received → Command Handler processes
2. Event generated → Stored in Event Store
3. Event published to Kafka
4. Consumers update read models
5. Query handlers serve read requests

## API Examples

### Create Order Command

```typescript
// POST /orders
{
  "userId": "user123",
  "asset": "BTC-USD",
  "type": "BUY",
  "price": 45000.00,
  "quantity": 1.5
}
```

Command Implementation:

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

### Get Order Query

```typescript
// GET /orders/:orderId
```

Query Implementation:

```typescript
class GetOrderQuery extends Query {
  constructor(public readonly orderId: string) {
    super();
  }
}

class GetOrderHandler extends QueryHandler<GetOrderQuery, any, Error> {
  async handle(query: GetOrderQuery): Promise<Result<OrderReadEntity, Error>> {
    try {
      const order = await orderReadRepo.findOrderById(query.orderId);
      if (!order) {
        return new Fail(new Error("Order not found"));
      }
      return new Success(order);
    } catch (error) {
      return new Fail(
        error instanceof Error ? error : new Error("Query failed")
      );
    }
  }
}
```

Response Example:

```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user123",
  "asset": "BTC-USD",
  "type": "BUY",
  "price": 45000.0,
  "quantity": 1.5,
  "status": "PENDING",
  "createdAt": "2024-02-09T12:00:00Z",
  "updatedAt": "2024-02-09T12:00:00Z"
}
```

## Getting Started

1. Clone the repository
2. Copy `.env.sample` to `.env` and configure your environment variables
3. Run `docker-compose up -d` to start infrastructure services
4. Install dependencies with `pnpm install`
5. Start the application with `pnpm start`

```

```
