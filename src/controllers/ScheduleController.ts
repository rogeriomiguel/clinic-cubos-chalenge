import { Request, Response } from 'express';
import ScheduleRepository from '../repositories/ScheduleRepository';

class ScheduleController {
  index(_request: Request, response: Response) {
    const schedules = ScheduleRepository.getAll();
    return response.json(schedules);
  }

  store(request: Request, response: Response) {
    ScheduleRepository.create(request.body);
    return response.sendStatus(201);
  }

  delete(request: Request, response: Response) {
    ScheduleRepository.delete(request.params.id);
    return response.sendStatus(200);
  }
}

export default new ScheduleController();
