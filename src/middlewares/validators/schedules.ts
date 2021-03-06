import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import BadRequestError from '../../errors/BadRequest';
import { Interval, Schedule } from '../../types/Schedule';
import {
  dateValidation,
  hourValidation,
  getHourNumber,
} from '../../utils/dates';

const validateValue = ({ type, values }: Schedule['type']) => {
  let schema = Joi.array();

  const daySchema = Joi.string().regex(dateValidation).required();
  const weeklySchema = Joi.string()
    .valid('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')
    .required();

  if (type.toLowerCase() === 'day')
    schema = Joi.array().required().items(daySchema);

  if (type.toLowerCase() === 'daily') schema = Joi.array();

  if (type.toLowerCase() === 'weekly')
    schema = Joi.array().required().items(weeklySchema);

  const { error } = schema.validate(values);

  if (error) {
    throw new BadRequestError(error.message);
  }
};

const validateIntervals = (intervals: Interval[]) => {
  let invalidInterval: Interval | undefined;

  intervals.forEach(interval => {
    const start = getHourNumber(interval.start);
    const end = getHourNumber(interval.end);

    if (start >= end) {
      invalidInterval = interval;
    }
  });

  if (invalidInterval) {
    throw new BadRequestError(`'start' cannot be bigger than 'end'`, {
      invalidInterval,
    });
  }
};

export const validateScheduleBody = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const typeSchema = Joi.object({
    type: Joi.string().valid('day', 'daily', 'weekly').required(),
    values: Joi.array(),
  }).required();

  const intervalSchema = Joi.object({
    start: Joi.string().regex(hourValidation).required(),
    end: Joi.string().regex(hourValidation).required(),
  }).required();

  const schema = Joi.object({
    type: typeSchema,
    intervals: Joi.array().required().items(intervalSchema),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    throw new BadRequestError(error.message);
  }

  validateIntervals(request.body.intervals);
  validateValue(request.body.type);

  next();
};
