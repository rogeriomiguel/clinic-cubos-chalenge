/* eslint-disable no-plusplus */
import { Request, Response } from 'express';
import ScheduleRepository from '../repositories/ScheduleRepository';
import { getDate, getDaysRange, formatDate, getWeekDay } from '../utils/dates';
import { WeekDays } from '../types/Week';
import { interval } from '../types/Schedule';
import { Appointment } from '../types/Appointment';

const MS_DAY = 86400;

class AppointmentController {
  index(request: Request, response: Response) {
    const { start, end } = request.query as interval;

    const startDate = getDate(start);
    const endDate = getDate(end);
    const daysRange = getDaysRange(startDate, endDate);
    let nextDay = MS_DAY;
    let msDate = startDate.valueOf();

    const schedules = ScheduleRepository.getAll();

    const dates: string[] = [];
    const weekDays: WeekDays[] = [];

    for (let i = 0; i <= daysRange; i++) {
      const date = new Date(msDate);
      const formatedDate = formatDate(date);
      const weekDay = getWeekDay(date);

      weekDays.push({ day: formatedDate, weekDay });
      dates.push(formatedDate);

      msDate = startDate.valueOf() + nextDay * 1000;
      nextDay += MS_DAY;
    }

    const appointments: Appointment[] = [];

    weekDays.forEach(day => {
      schedules.forEach(schedule => {
        if (schedule.type.type === 'day') {
          if (schedule.type.value[0] === day.day) {
            const { intervals } = schedule;
            const index = appointments.findIndex(item => item.day === day.day);

            if (index === -1) {
              appointments.push({ day: day.day, intervals });
            } else {
              appointments.splice(index, 1, {
                day: day.day,
                intervals: [...appointments[index].intervals, ...intervals],
              });
            }
          }
        }

        if (schedule.type.type === 'daily') {
          const { intervals } = schedule;
          const index = appointments.findIndex(item => item.day === day.day);

          if (index === -1) {
            appointments.push({ day: day.day, intervals });
          } else {
            appointments.splice(index, 1, {
              day: day.day,
              intervals: [...appointments[index].intervals, ...intervals],
            });
          }
        }

        if (schedule.type.type === 'weekly') {
          if (schedule.type.value.includes(day.weekDay)) {
            const { intervals } = schedule;
            const index = appointments.findIndex(item => item.day === day.day);

            if (index === -1) {
              appointments.push({ day: day.day, intervals });
            } else {
              appointments.splice(index, 1, {
                day: day.day,
                intervals: [...appointments[index].intervals, ...intervals],
              });
            }
          }
        }
      });
    });

    return response.json(appointments);
  }
}

export default new AppointmentController();
