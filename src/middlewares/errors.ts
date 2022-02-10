import { Request, Response, NextFunction } from 'express';
import RequestError from '../types/RequestError';

const getErrorName = (name: string) => {
  const isGenericError = !name || name === 'Error';
  return isGenericError ? 'InternalServerError' : name;
};

const isError = (error: RequestError) => {
  return error instanceof Error;
};

export default (
  error: RequestError,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!isError(error)) return next();

  const {
    message = 'Internal Server Error',
    name,
    statusCode = 500,
    details = null,
  } = error;

  const errorBody = {
    message,
    error: getErrorName(name),
    statusCode,
    details,
  };
  return response.status(statusCode).json(errorBody);
};
