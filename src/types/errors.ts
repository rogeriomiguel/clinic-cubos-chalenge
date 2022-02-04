export default interface RequestError extends Error {
  message: string;
  name: string;
  statusCode: number;
  details: {};
}
