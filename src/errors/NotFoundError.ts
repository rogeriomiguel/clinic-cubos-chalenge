export default class NotFoundError extends Error {
  statusCode: number;

  details: object | undefined;

  constructor(message?: string, details?: object | undefined) {
    super(message || 'NotFound');
    this.name = 'NotFoundError';
    this.statusCode = 404;
    this.details = details;
  }
}
