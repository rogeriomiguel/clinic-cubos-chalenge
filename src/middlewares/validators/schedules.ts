import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import BadRequestError from '../../errors/BadRequest';
import Schedule from '../../types/Schedule';

const dateValidation =
  /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
const hourValidation = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

const validateValue = ({ type, value }: Schedule['type']) => {
  let schema = Joi.array();

  const daySchema = Joi.string().regex(dateValidation).required();
  const weeklySchema = Joi.string()
    .valid('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')
    .required();

  if (type.toLowerCase() === 'day')
    schema = Joi.array().required().items(daySchema);

  if (type.toLowerCase() === 'daily') schema = Joi.array().allow(null);

  if (type.toLowerCase() === 'weekly')
    schema = Joi.array().required().items(weeklySchema);

  const { error } = schema.validate(value);

  if (error) {
    throw new BadRequestError(error.message);
  }
};

export const validateScheduleBody = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const scheduleSchema = Joi.object({
    type: Joi.string().valid('day', 'daily', 'weekly').required(),
    value: [Joi.array().optional(), Joi.allow(null)],
  }).required();

  const intervalSchema = Joi.object({
    start: Joi.string().regex(hourValidation).required(),
    end: Joi.string().regex(hourValidation).required(),
  }).required();

  const schema = Joi.object({
    type: scheduleSchema,
    intervals: Joi.array().required().items(intervalSchema),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    throw new BadRequestError(error.message);
  }

  validateValue(request.body.type);

  next();
};
