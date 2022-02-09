import BadRequestError from '../errors/BadRequest';
import ScheduleRepository from '../repositories/ScheduleRepository';
import { Interval, Schedule } from '../types/Schedule';
import { getDate, getWeekDay, verifyHourConflict } from '../utils/dates';

class ScheduleController {
  getSchedules() {
    return ScheduleRepository.getAll();
  }

  createSchedule(newSchedule: Schedule) {
    const schedules = ScheduleRepository.getAll();
    const { conflict, conflictSchedule } = this.verifyScheduleConflict(
      schedules,
      newSchedule
    );

    if (conflict) {
      throw new BadRequestError('Schedule rule conflict', {
        scheduleConflict: conflictSchedule,
      });
    }

    ScheduleRepository.create(newSchedule);
  }

  verifyScheduleConflict(schedules: Schedule[], newSchedule: Schedule) {
    let conflict: Object | undefined;
    let conflictSchedule: Schedule | undefined;

    schedules.forEach(schedule => {
      if (newSchedule.type.type === 'day') {
        if (!conflict) {
          conflict = this.verifyDayConflict(schedule, newSchedule);
          conflictSchedule = schedule;
        }
      }

      if (newSchedule.type.type === 'daily') {
        if (!conflict) {
          conflict = this.verifyIntervalsConflict(schedule, newSchedule);
          conflictSchedule = schedule;
        }
      }

      if (newSchedule.type.type === 'weekly') {
        if (!conflict) {
          conflict = this.verifyWeeklyConflict(schedule, newSchedule);
          conflictSchedule = schedule;
        }
      }
    });

    return { conflict, conflictSchedule };
  }

  verifyDayConflict(schedule: Schedule, newSchedule: Schedule) {
    let conflict: Object | undefined;

    if (schedule.type.type === 'day') {
      const isSameDay = schedule.type.values[0] === newSchedule.type.values[0];
      if (isSameDay) {
        conflict = this.verifyIntervalsConflict(schedule, newSchedule);
      }
    }

    if (schedule.type.type === 'daily') {
      conflict = this.verifyIntervalsConflict(schedule, newSchedule);
    }

    if (schedule.type.type === 'weekly') {
      const date = getDate(newSchedule.type.values[0]);
      const weekDay = getWeekDay(date);

      if (schedule.type.values.includes(weekDay)) {
        conflict = this.verifyIntervalsConflict(schedule, newSchedule);
      }
    }

    return conflict;
  }

  verifyWeeklyConflict(schedule: Schedule, newSchedule: Schedule) {
    let conflict: Object | undefined;

    if (schedule.type.type === 'day') {
      const date = getDate(schedule.type.values[0]);
      const weekDay = getWeekDay(date);

      if (newSchedule.type.values.includes(weekDay)) {
        conflict = this.verifyIntervalsConflict(schedule, newSchedule);
      }
    }

    if (schedule.type.type === 'daily') {
      conflict = this.verifyIntervalsConflict(schedule, newSchedule);
    }

    if (schedule.type.type === 'weekly') {
      const weekDayConflict = schedule.type.values.find(day =>
        newSchedule.type.values.includes(day)
      );

      if (weekDayConflict) {
        conflict = this.verifyIntervalsConflict(schedule, newSchedule);
      }
    }

    return conflict;
  }

  verifyIntervalsConflict(schedule: Schedule, newSchedule: Schedule) {
    let conflict: Interval | undefined;

    schedule.intervals.forEach(interval => {
      if (!conflict) {
        conflict = newSchedule.intervals.find(newInterval => {
          return verifyHourConflict(interval, newInterval);
        });
      }
    });

    return conflict;
  }

  deleteSchedule(id: string) {
    ScheduleRepository.delete(id);
  }
}

export default new ScheduleController();
