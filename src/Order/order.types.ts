export enum OrderType {
  BUY = "BUY",
  SELL = "SELL",
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export class CreateOrderDTO {
  constructor(
    public readonly userId: string,
    public readonly asset: string,
    public readonly orderType: OrderType,
    public readonly price: number,
    public readonly quantity: number
  ) {}

  static validate(dto: CreateOrderDTO): boolean {
    if (dto.price <= 0) return false;
    if (dto.quantity <= 0) return false;
    return true;
  }
}
