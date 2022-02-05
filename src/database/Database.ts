import fs from 'fs';
import crypto from 'crypto';
import NotFoundError from '../errors/NotFoundError';

class Database {
  createDatabase() {
    const databaseExists = fs.existsSync(`${__dirname}/data/database.json`);

    if (!databaseExists) {
      const obj = {
        schedules: [],
      };

      const database = JSON.stringify(obj);

      fs.writeFileSync(`${__dirname}/data/database.json`, database);
      // eslint-disable-next-line no-console
      console.log('Database created');
    }
  }

  getDatabase() {
    const database = fs.readFileSync(
      `${__dirname}/data/database.json`,
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

  findAll() {
    const { schedules } = this.getDatabase();
    return schedules;
  }

  create(data: any) {
    const database = this.getDatabase();
    const id = this.getRandomId();
    database.schedules.push({ id, ...data });

    const updatedDatabase = JSON.stringify(database);
    fs.writeFileSync(`${__dirname}/data/database.json`, updatedDatabase);
  }

  delete(id: string) {
    const database = this.getDatabase();
    const index = database.schedules.findIndex(
      (schedule: any) => schedule.id === id
    );

    if (index === -1) {
      throw new NotFoundError();
    }

    database.schedules.splice(index, 1);

    const updatedDatabase = JSON.stringify(database);
    fs.writeFileSync(`${__dirname}/data/database.json`, updatedDatabase);
  }
}

export default new Database();
