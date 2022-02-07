import ScheduleRepository from '../repositories/ScheduleRepository';
import { Schedule } from '../types/Schedule';

class ScheduleController {
  getSchedules() {
    return ScheduleRepository.getAll();
  }

  createSchedule(schedule: Schedule) {
    ScheduleRepository.create(schedule);
  }

  deleteSchedule(id: string) {
    ScheduleRepository.delete(id);
  }
}

export default new ScheduleController();
