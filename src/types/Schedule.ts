type interval = {
  start: string;
  end: string;
};

export default interface Schedule {
  type: {
    type: string;
    value: string | string[] | null;
  };
  intervals: interval[];
}
