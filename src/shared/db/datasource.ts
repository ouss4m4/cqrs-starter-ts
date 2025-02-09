import { OrderEventEntity } from "./../../Order/Entities/order-events.entity";
import { DataSource } from "typeorm";
import { OrderEntity, OrderReadEntity } from "../../Order/Entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [OrderEntity, OrderReadEntity,OrderEventEntity],
  subscribers: [],
  migrations: [],
});
