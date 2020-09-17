import { RestClient } from '../../RestClient';

export interface IClass {
  endPoint: string;
  rest: RestClient;
}

export type Timestamp = number;

export interface ISecurityParamters {
    username?: string;
    startTime?: Timestamp;
    endTime?: Timestamp;
    offset?: number;
    limit?: number;
}