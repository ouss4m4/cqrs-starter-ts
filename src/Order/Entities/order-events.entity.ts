import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from "typeorm";

@Index(["orderId"])
@Entity("order_events")
export class OrderEventEntity {
  @PrimaryGeneratedColumn("uuid", { name: "event_id" })
  public eventId!: string;

  @Column({ type: "uuid", name: "order_id" })
  public orderId!: string;

  @Column({ type: "varchar", length: 100, name: "event_type" })
  public eventType!: string;

  @Column({ type: "jsonb", name: "event_data" })
  public eventData!: Record<string, any>;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  public createdAt!: Date;
}
