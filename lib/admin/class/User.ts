import { Rest } from '../got';
import { URLSearchParams } from 'url';
import { IParamUser, IRetriveUserSearch, IRetriveUsersResponse, IUser, IGroupNames } from './../interfaces/User';
import { RosterObject, RosterItem } from '../interfaces/Roster';
import { Response } from 'got/dist/source';
import Helper from '../helper';
import {client, xml, jid} from '@xmpp/client';

class User {
  private endPoint = 'users';
  constructor(private rest: Rest) {
    
  }

  /**
   * Retrieve users
   * @description Endpoint to get all or filtered users
   * 
   * @param query 
   */
  public async retriveUsers(query: IRetriveUserSearch): Promise<IRetriveUsersResponse> {
    const searchParams = new URLSearchParams(query as any);
    const users = (await this.rest.get(this.endPoint, {
      searchParams: searchParams.toString(),
    })) as IRetriveUsersResponse;
    return users;
  }

  /**
   * Retrieve a user
   * @description Endpoint to get information over a specific user
   * 
   * @param username 
   */
  public async retriveUser(username: string): Promise<IUser> {
    const url = `users/${username}`;
    const user = (await this.rest.get(url)) as IUser;
    return user;
  }

  /**
   * Create a user
   * @description Endpoint to create a new user
   * 
   * @param data 
   */
  public async createUser(
    data: IParamUser,
  ): Promise<{ statusMessage: string | undefined; statusCode: number }> {
    const { statusCode, statusMessage } = await this.rest.post(this.endPoint, {
      json: data,
    });
    return {
      statusCode,
      statusMessage,
    };
  }

  /**
   * Delete a user
   * @description Endpoint to delete a user
   * 
   * @param username 
   */
  public async deleteUser(username: string): Promise<{ body: object; statusCode: number }> {
    const endPoint = `users/${username}`;
    const { body, statusCode } = (await this.rest.delete(endPoint)) as Response;
    return {
      body: body as object,
      statusCode,
    };
  }

  /**
   * Update a user
   * @description Endpoint to update / rename a user
   * 
   * @param username 
   * @param data 
   */
  public async updateUser(username: string, data: IParamUser): Promise<number> {
    const endPoint = `users/${username}`;
    const response = await this.rest.put(endPoint, { json: data });
    return response.statusCode;
  }

  /**
   * Retrieve all user groups
   * TODO : Add return type
   * @description Endpoint to get group names of a specific user
   * 
   * @param username 
   */
  public async retrieveAllUserGroups(username: string): Promise<IGroupNames> {
    return this.getUserGroups(username);
  }

  /**
   * Retrieve all user groups
   * TODO : Add return type
   * @description Endpoint to get group names of a specific user
   * 
   * @param username 
   */
  public async getUserGroups(username: string): Promise<IGroupNames> {
    const url = `${this.endPoint}/users/${username}/groups`;
    const groups = await this.rest.get(url) as IGroupNames;
    return groups;
  }

  /**
   * Add user to groups
   * @description Endpoint to add user to a group
   * 
   * @param username 
   * @param groups 
   */
  public async addUserToGroups(username: string, groupNames: IGroupNames): Promise<number> {
    const url = `${this.endPoint}/${username}/groups}`;
    const { statusCode } = await this.rest.post(url, {json: groupNames});
    return statusCode;
  }

  /**
   * Add user to group
   * @description Endpoint to add user to a group
   * 
   * @param username 
   * @param groupname 
   */
  public async addUserToGroup(username: string, groupname: string): Promise<number> {
    const url = `${this.endPoint}/${username}/groups/${groupname}`;
    const { statusCode } = await this.rest.post(url);
    return statusCode;
  }

  /**
   * Delete a user from a group
   * TODO add types
   * @description Endpoint to remove a user from a groups
   * 
   * @param username 
   * @param groupName 
   */
  public async deleteUserFromGroups(username: string, groupNames: IGroupNames): Promise<Object> {
    const url = `${this.endPoint}/${username}/groups`;
    const { body, statusCode } = (await this.rest.delete(url, {json: groupNames})) as Response;
    return {
      body: body as object,
      statusCode,
    };
  }

  /**
   * Delete a user from a group
   * TODO add types
   * @description Endpoint to remove a user from a group
   * 
   * @param username 
   * @param groupname 
   */
  public async deleteUserFromGroup(username: string, groupname: string): Promise<number> {
    const url = `${this.endPoint}/${username}/groups/${groupname}`;
    const { statusCode } = await this.rest.delete(url);
    return statusCode;
  }

  /**
   * Lockout a user
   * @description  Endpoint to lockout / ban the user from the chat server.
   * The user will be kicked if the user is online.
   * 
   * @param username 
   */
  public async lockoutUser(username: string): Promise<number> {
    const url = `lockouts/${username}`;
    const { statusCode } = await this.rest.post(url);
    return statusCode;
  }

  /**
   * 
   * @param username 
   */
  public async unlockUser(username: string): Promise<number> {
    const url = `lockouts/${username}`;
    const { statusCode } = await this.rest.delete(url);
    return statusCode;
  }

  /**
   * Retrieve user roster
   * Endpoint to get roster entries (buddies) from a specific user
   * 
   * @param username 
   */
  public async retriveUserRoster(username: string): Promise<RosterObject> {
    const endPoint = `${this.endPoint}/${username}/roster`;
    const rosters = (await this.rest.get(endPoint)) as RosterObject;
    return rosters;
  }

  /**
   * Create a user roster entry
   * !not working
   * 
   * @param username 
   * @param rooster 
   */
  public async createUserRoster(username: string, rooster: RosterItem): Promise<number> {
    const url = `${this.endPoint}/${username}/roster`;

    const body = Helper.makeRoosterBody(rooster);
    console.log(body);
    const { statusCode } = await this.rest.post(url, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return statusCode;
  }

  /**
   * Delete a user roster entry
   * 
   * @param username
   * @param jid 
   */
  public async deleteUserRoster(username: string, jid: string): Promise<number> {
    const endPoint = `${this.endPoint}/${username}/roster/${jid}`;
    const { statusCode } = await this.rest.post(endPoint);
    return statusCode;
  }

  /**
   * Update a user roster entry
   * 
   * @param username 
   * @param rosterItem 
   */
  public async updateUserRoster(username: string, rosterItem: RosterItem): Promise<number> {
    const jid = rosterItem.jid;
    const endPoint = `${this.endPoint}/${username}/roster/${jid}`;
    const { statusCode } = await this.rest.put(endPoint, {json: rosterItem});
    return statusCode;
  }
}

export default User;
