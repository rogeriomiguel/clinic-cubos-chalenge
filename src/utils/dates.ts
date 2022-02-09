// export const formatDate = (date: string) => date.split('-').reverse().join('-');
import { Week } from '../types/Day';
import { Interval } from '../types/Schedule';

export const dateValidation =
  /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
export const hourValidation = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const getDate = (date: string) => {
  const [year, month, day] = date.split('-').reverse();
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const getDaysRange = (start: any, end: any) => {
  const range = Math.abs(start - end) / 1000.0;
  const daysRange = range / 86400;
  return daysRange;
};

export const formatDate = (date: Date) => {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const week: Week = {
  '0': 'sun',
  '1': 'mon',
  '2': 'tue',
  '3': 'wed',
  '4': 'thu',
  '5': 'fri',
  '6': 'sat',
};

export const getWeekDay = (date: Date) => {
  const weekDay = date.getDay();
  return week[weekDay];
};

export const getHourNumber = (dateHour: string) => {
  const [hour, minutes] = dateHour.split(':');
  return Number(hour) * 60 + Number(minutes);
};

export const verifyHourConflict = (
  intervalA: Interval,
  intervalB: Interval
) => {
  let isBetween = false;
  const startA = getHourNumber(intervalA.start);
  const endA = getHourNumber(intervalA.end);
  const startB = getHourNumber(intervalB.start);
  const endB = getHourNumber(intervalB.end);

  const isStartBetween = startA <= startB && startB <= endA;
  const isEndBetween = startA <= endB && endB <= endA;
  const isEndAfter = startB <= startA && endB >= endA;

  if (isStartBetween) {
    isBetween = true;
  }

  if (isEndBetween) {
    isBetween = true;
  }

  if (isEndAfter) {
    isBetween = true;
  }

  return isBetween;
};
