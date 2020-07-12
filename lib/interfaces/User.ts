export interface Property {
  key: string;
  value: string;
}

export interface IPProperty {
  '@key': string;
  '@value': string;
}

export interface Properties {
  property: IPProperty[];
}

export interface User {
  username: string;
  name: string;
  email: string;
  password?: any;
  properties: Property[];
}

export interface IParamUser {
  name?: string;
  username: string;
  email?: string;
  password: string;
  properties?: Properties;
}

export interface IRetriveUsersResponse {
  users: User[];
}

export interface IRetriveUserSearch {
  search?: string;
  propertyKey?: string;
  propertyValue?: string;
}
