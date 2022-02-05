import { Request, Response } from 'express';
import ScheduleRepository from '../repositories/ScheduleRepository';

class ScheduleController {
  store(request: Request, response: Response) {
    ScheduleRepository.create(request.body);
    return response.sendStatus(201);
  }
}

export default new ScheduleController();
