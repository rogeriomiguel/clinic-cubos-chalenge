export default class BadRequestError extends Error {
  statusCode: number;

  details: object | undefined;

  constructor(message: string, details?: object | undefined) {
    super(message || 'BadRequest');
    this.name = 'BadRequestError';
    this.statusCode = 400;
    this.details = details;
  }
}
