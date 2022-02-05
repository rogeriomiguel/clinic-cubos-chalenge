import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';
import { validateScheduleBody } from '../middlewares/validators/schedules';

const routes = Router();

routes.post('/schedules', validateScheduleBody, ScheduleController.store);

export default routes;
