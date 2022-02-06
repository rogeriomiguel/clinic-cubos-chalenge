import { Router } from 'express';
import schedules from './schedules';
import appointments from './appointments';

const routes = Router();

[schedules, appointments].forEach(route => routes.use(route));

export default routes;
