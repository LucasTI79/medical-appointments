export class CustomError extends Error {
  statusCode?: number;
  constructor(
    message: string,
    statusCode: number = 500,
    name = "CUSTOM_ERROR"
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
