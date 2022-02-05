import Schedule from '../types/Schedule';
import Database from '../database/Database';

class ScheduleRepository {
  getAll(): Schedule[] {
    return Database.findAll();
  }

  create(data: Schedule) {
    Database.create(data);
  }

  delete(id: string) {
    Database.delete(id);
  }
}

export default new ScheduleRepository();
