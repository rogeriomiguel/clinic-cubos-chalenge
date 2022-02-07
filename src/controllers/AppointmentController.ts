/* eslint-disable no-plusplus */
import { Request, Response } from 'express';
import { interval } from '../types/Schedule';
import AppointmentDomain from '../domain/AppointmentDomain';

class AppointmentController {
  index(request: Request, response: Response) {
    const { start, end } = request.query as interval;
    const appointments = AppointmentDomain.getAppointments({ start, end });
    return response.json(appointments);
  }
}

export default new AppointmentController();
