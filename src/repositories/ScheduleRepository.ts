import fs from 'fs';
import crypto from 'crypto';
import Schedule from '../types/Schedule';

class ScheduleRepository {
  create(data: Schedule) {
    const database = this.getDatabase();
    const id = this.getRandomId();
    database.schedules.push({ id, ...data });

    const newDatabase = JSON.stringify(database);
    fs.writeFileSync(`${__dirname}/../database/database.json`, newDatabase);
  }

  getDatabase() {
    const database = fs.readFileSync(
      `${__dirname}/../database/database.json`,
      'utf-8'
    );

    return JSON.parse(database);
  }

  getRandomId = () => {
    const currentDate = new Date().valueOf().toString();
    const random = Math.random().toString();
    return crypto
      .createHash('sha1')
      .update(currentDate + random)
      .digest('hex');
  };
}

export default new ScheduleRepository();
