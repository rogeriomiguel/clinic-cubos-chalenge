import { Router } from 'express';
import schedules from './schedules';
import appointments from './appointments';
import swagger from './swagger';

const routes = Router();

[schedules, appointments, swagger].forEach(route => routes.use(route));

export default routes;
