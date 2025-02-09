import { Request, Response } from "express";

interface Error {
  message: string;
  status?: number;
}

type Result<T> = {
  success: boolean;
  data?: T;
  error?: Error;
};

export abstract class BaseController {
  abstract execute(req: Request, res: Response): Promise<Result<any>>;
}
