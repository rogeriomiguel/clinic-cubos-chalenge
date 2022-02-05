import Server from './server';
import createDatabase from './database';

try {
  createDatabase();
  new Server().init();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
