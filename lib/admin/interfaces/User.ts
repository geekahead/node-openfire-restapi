import { Timestamp } from "./common";

export interface IProperty {
  key: string;
  value: string;
}

export interface IPProperty {
  '@key': string;
  '@value': string;
}

export interface IProperties {
  property: IProperty[];
}

export interface IUser {
  username: string;
  name: string;
  email: string;
  password?: any;
  properties: IProperty[];
}

export interface IParamUser {
  name?: string;
  username: string;
  email?: string;
  password?: string;
  properties?: IProperties;
}

export interface IRetriveUsersResponse {
  users: IUser[];
}

export interface IRetriveUserSearch {
  search?: string;
  propertyKey?: string;
  propertyValue?: string;
}

export interface IGroupNames {
    groupname: string[];
}

export interface IGroup {
    name: string;
    description: string;
    admins?: string[];
    members?: string[];
}

export interface IGroups {
    groups: IGroup[];
}

export type SessionStatus = "Authenticated";

export type PresenceStatus = "Online" | "Offline";

export interface ISession {
    sessionId: string;
    username: string;
    resource?: string;
    node: string;
    sessionStatus: SessionStatus;
    presenceStatus: PresenceStatus;
    presenceMessage: string;
    priority: number;
    hostAddress: string;
    hostName: string;
    creationDate: Timestamp;
    lastActionDate: Timestamp;
    secure: boolean;
}

export interface ISessions {
    sessions: ISession[];
}

export interface ISessionsCount {
    localSessions: number;
    clusterSessions: number;
}