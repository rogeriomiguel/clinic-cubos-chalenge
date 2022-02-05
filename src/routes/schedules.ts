import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';
import { validateScheduleBody } from '../middlewares/validators/schedules';

const routes = Router();

routes.get('/schedules', ScheduleController.index);
routes.post('/schedules', validateScheduleBody, ScheduleController.store);
routes.delete('/schedules/:id', ScheduleController.delete);

export default routes;
