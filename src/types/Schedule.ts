export type Interval = {
  start: string;
  end: string;
};

export interface Schedule {
  id: string;
  type: {
    type: string;
    values: string[];
  };
  intervals: Interval[];
}
