# Order Matching Engine with CQRS

A sophisticated order matching engine built using CQRS (Command Query Responsibility Segregation) pattern and Event Sourcing.

## TODOs

- Architecture boilerplate
  - kafka as a broker ✅
  - cqrs orders aggregate ✅
  - postgres ✅ (typeorm)
  - redis - wip
  - grafana/prometheus todo
- Orders - WIP

  - create order ✅
    - read/write model
    - eventstore
    - pending status by default
  - Update Order:
    - Implement event store for canceled/completed status (options: Postgres event sourcing, Event Store DB).
    - Consider partial fulfillment when updating the order (e.g., partially matched orders stay open).
  - Order Matching Logic:
    - Decide whether to use a single-threaded or multi-threaded approach for matching. You could go async or use workers to handle multiple matches.
    - Implement order price matching:
      - Limit order matching: Handle matching based on specific price and time priority.
      - Market order matching: Fulfill at the best available price.
    - Advanced Matching:
      - Slippage: Consider implementing logic to allow or avoid price slippage (e.g., executing at the next best price if the market moves).
      - Partial Order Execution: Handle cases where orders are only partially filled.

- Order Matching Engine - WIP

  - Min-Max Heap:
    - Refine the heap structure:
      - Buy Orders Heap: Max-heap (prioritize highest buy prices).
      - Sell Orders Heap: Min-heap (prioritize lowest sell prices).
    - Heap Operations:
      - Insert, Remove, and Peek operations.
      - Handle simultaneous heap updates when an order is executed.
  - Cache Setup:
    - Use Redis to cache order data (e.g., order details and market price).
    - Cache the order book for faster lookups.
    - Eviction strategies (LRU, FIFO, etc.) based on order expiry or matching activity.
  - Schedulers/Async Operations:
    - Use Cron jobs or BullMQ for handling timed tasks:
    - Regularly clean up expired orders.
    - Schedule order matching in off-peak hours or during peak market activity.
    - Consider rate-limiting or backpressure for batch processing.
  - Queue (BullMQ):
    - Set up BullMQ queues for:
    - Order processing (matching).
    - Trade execution (distribute matching tasks to workers).
    - Use BullMQ workers to process orders concurrently or in batches.
    - Integrate delayed jobs for time-sensitive orders (e.g., order expiration).

- Data Consistency and Reliability

  - Eventual Consistency: Ensure that orders are eventually matched and order states (pending, canceled, completed) are synchronized across systems.
  - Atomicity: Make sure matching and order updates happen atomically, possibly using transactions or sagas.

- Monitoring & Logging
  - Grafana/Prometheus:
  - Integrate Prometheus to track metrics like order fulfillment rate, matching latency, queue length, etc.
  - Grafana dashboards to visualize order flow, market prices, and system health.
  - Logging:
  - Add logging for order matching activities and errors.
  - Consider a distributed tracing system (e.g., Jaeger) for tracing order matching events across services.

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
