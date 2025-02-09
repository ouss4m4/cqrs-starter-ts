export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
export enum OrderType {
  BUY = 1,
  SELL = 2,
}

export const ORDER_TYPE_MAP = {
  BUY: OrderType.BUY,
  SELL: OrderType.SELL,
} as const;

export type OrderTypeString = keyof typeof ORDER_TYPE_MAP;

export interface OrderToPersistance {
  
}