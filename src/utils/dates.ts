// export const formatDate = (date: string) => date.split('-').reverse().join('-');
import { Week } from '../types/Week';

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
