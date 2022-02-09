import { Interval } from './Schedule';

export interface Appointment {
  day: string;
  intervals: Interval[];
}
