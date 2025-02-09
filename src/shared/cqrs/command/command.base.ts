export abstract class Command {
  abstract readonly module: string;
  abstract readonly type: string;
}
