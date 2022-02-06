import { interval } from './Schedule';

export interface Appointment {
  day: string;
  intervals: interval[];
}
