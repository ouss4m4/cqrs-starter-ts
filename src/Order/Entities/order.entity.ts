import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderStatus, OrderType } from "../order.types";

@Entity("orders")
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid", { name: "order_id" })
  public orderId!: string;

  @Column({ type: "uuid", name: "user_id" })
  public userId!: string;

  @Column({ type: "varchar", length: 50, name: "asset" })
  public asset!: string;

  @Column({ type: "enum", enum: OrderType, name: "type" })
  public type!: OrderType;

  @Column({ type: "decimal", precision: 18, scale: 8, name: "price" })
  public price!: number;

  @Column({ type: "decimal", precision: 18, scale: 8, name: "quantity" })
  public quantity!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    name: "status",
  })
  public status!: OrderStatus;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  public updatedAt!: Date;
}
