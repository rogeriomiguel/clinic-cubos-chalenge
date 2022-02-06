import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';
import { validateAppointmentQuery } from '../middlewares/validators/appointments';

const routes = Router();

routes.get(
  '/appointments',
  validateAppointmentQuery,
  AppointmentController.index
);

export default routes;
