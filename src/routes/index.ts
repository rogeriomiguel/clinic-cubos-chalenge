import { Router } from 'express';
import schedules from './schedules';

const routes = Router();

[schedules].forEach(route => routes.use(route));

export default routes;
