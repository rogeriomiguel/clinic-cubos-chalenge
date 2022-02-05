import fs from 'fs';

const createDatabase = () => {
  const databaseExists = fs.existsSync(`${__dirname}/database.json`);

  if (!databaseExists) {
    const obj = {
      schedules: [],
    };

    const database = JSON.stringify(obj);

    fs.writeFileSync(`${__dirname}/database.json`, database);
    // eslint-disable-next-line no-console
    console.log('Database created');
  }
};

export default createDatabase;
