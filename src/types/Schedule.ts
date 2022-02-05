type interval = {
  start: string;
  end: string;
};

export default interface Schedule {
  id: string;
  type: {
    type: string;
    value: string[] | null;
  };
  intervals: interval[];
}
