import { Request, Response } from 'express';
import ScheduleDomain from '../domain/ScheduleDomain';

class ScheduleController {
  index(_request: Request, response: Response) {
    const schedules = ScheduleDomain.getSchedules();
    return response.json(schedules);
  }

  store(request: Request, response: Response) {
    ScheduleDomain.createSchedule(request.body);
    return response.sendStatus(201);
  }

  delete(request: Request, response: Response) {
    ScheduleDomain.deleteSchedule(request.params.id);
    return response.sendStatus(200);
  }
}

export default new ScheduleController();
