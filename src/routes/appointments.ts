import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const routes = Router();

routes.get('/appointments', AppointmentController.index);

export default routes;
