export type Result<T = void> = {
  success: boolean;
  data?: T;
  error?: Error;
  metadata?: Record<string, unknown>;
};
