import { OrderEventEntity } from "../../Order/entities/order-events.entity";
import { DataSource } from "typeorm";
import { OrderEntity, OrderReadEntity } from "../../Order/entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [OrderEntity, OrderReadEntity, OrderEventEntity],
  subscribers: [],
  migrations: [],
});
