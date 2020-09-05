import { Rest } from '../got';

export interface IClass {
  endPoint: string;
  rest: Rest;
}

export type RequestFormat = "json" | "xml";

export type ResponseFormat = "json" | "xml";

export type Timestamp = number;