/* eslint-disable no-plusplus */
import ScheduleRepository from '../repositories/ScheduleRepository';
import { getDate, getDaysRange, formatDate, getWeekDay } from '../utils/dates';
import { Day } from '../types/Day';
import { Interval, Schedule } from '../types/Schedule';
import { Appointment } from '../types/Appointment';

const MS_DAY = 86400;

class AppointmentDomain {
  getAppointments({ start, end }: Interval): Appointment[] {
    const days = this.getDays({ start, end });
    const schedules = ScheduleRepository.getAll();
    const appointments = this.mountAppointments(days, schedules);
    return appointments.map(appointment => {
      appointment.intervals.sort(this.sortIntervals);
      return appointment;
    });
  }

  getDays({ start, end }: Interval): Day[] {
    const startDate = getDate(start);
    const endDate = getDate(end);
    const daysRange = getDaysRange(startDate, endDate);
    let nextDay = MS_DAY;
    let msDate = startDate.valueOf();

    const days: Day[] = [];

    for (let i = 0; i <= daysRange; i++) {
      const date = new Date(msDate);
      const formatedDate = formatDate(date);
      const weekDay = getWeekDay(date);

      days.push({ day: formatedDate, weekDay });

      msDate = startDate.valueOf() + nextDay * 1000;
      nextDay += MS_DAY;
    }

    return days;
  }

  refreshAppointments(
    schedule: Schedule,
    day: Day,
    appointments: Appointment[]
  ) {
    const newAppointments = appointments;
    const { intervals } = schedule;
    const index = newAppointments.findIndex(item => item.day === day.day);

    if (index === -1) {
      newAppointments.push({ day: day.day, intervals });
    } else {
      newAppointments.splice(index, 1, {
        day: day.day,
        intervals: [...newAppointments[index].intervals, ...intervals],
      });
    }

    return newAppointments;
  }

  mountAppointments(days: Day[], schedules: Schedule[]): Appointment[] {
    let appointments: Appointment[] = [];

    days.forEach(day => {
      schedules.forEach(schedule => {
        if (schedule.type.type === 'day') {
          if (schedule.type.values[0] === day.day) {
            appointments = this.refreshAppointments(
              schedule,
              day,
              appointments
            );
          }
        }

        if (schedule.type.type === 'daily') {
          appointments = this.refreshAppointments(schedule, day, appointments);
        }

        if (schedule.type.type === 'weekly') {
          if (schedule.type.values.includes(day.weekDay)) {
            appointments = this.refreshAppointments(
              schedule,
              day,
              appointments
            );
          }
        }
      });
    });

    return appointments;
  }

  sortIntervals(a: Interval, b: Interval) {
    return (
      Number(a.start.replace(':', '.')) - Number(b.start.replace(':', '.'))
    );
  }
}

export default new AppointmentDomain();
