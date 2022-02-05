type interval = {
  start: string;
  end: string;
};

export default interface Schedule {
  type: {
    type: string;
    value: string[] | null;
  };
  intervals: interval[];
}
