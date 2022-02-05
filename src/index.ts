import Server from './server';
import Database from './database/Database';

try {
  Database.createDatabase();
  Server.init();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
