import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';

const routes = Router();

routes.post('/schedules', ScheduleController.store);

export default routes;
