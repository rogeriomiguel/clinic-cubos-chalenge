import Server from './server';

try {
  new Server().init();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
