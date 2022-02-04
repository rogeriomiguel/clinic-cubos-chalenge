import express, { Express } from 'express';
import errors from './middlewares/errors';

export default class Server {
  private express: Express;

  constructor() {
    this.express = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrors();
  }

  initializeMiddlewares() {
    this.express.use(express.json());
  }

  initializeRoutes() {
    this.express.use('/', (req, res) => res.json({ status: 'Running' }));
  }

  initializeErrors() {
    this.express.use(errors);
  }

  init() {
    const PORT = 3000;
    this.express.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on port ${PORT}`);
    });
  }
}
