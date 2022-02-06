import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import BadRequestError from '../../errors/BadRequest';
import { interval } from '../../types/Schedule';
import { dateValidation, getDate } from '../../utils/dates';

export const validateAppointmentQuery = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    start: Joi.string().regex(dateValidation).required(),
    end: Joi.string().regex(dateValidation).required(),
  }).required();

  const { error } = schema.validate(request.query);

  if (error) {
    throw new BadRequestError(error.message);
  }

  const { start, end } = request.query as interval;

  if (getDate(start).valueOf() > getDate(end).valueOf()) {
    throw new BadRequestError(`'start' cannot be bigger than 'end' `);
  }

  next();
};
