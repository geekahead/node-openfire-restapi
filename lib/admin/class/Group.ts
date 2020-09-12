import { Rest } from '../../got';

/**
 * All api params related to groups
 * @see https://www.igniterealtime.org/projects/openfire/plugins/1.3.8/restAPI/readme.html#group-related-rest-endpoints
 */

import {IGroup, IGroups} from '../interfaces/User';

class Group {
  private endPoint = 'groups';
  constructor(private rest: Rest) {}

  /**
   * Retrieve all groups.
   */
  public async retriveAllGroups(): Promise<IGroups> {
    const url = `${this.endPoint}`;
    const groups = (await this.rest.get(url)) as IGroups;

    return groups;
  }

  /**
   * Retrieve a group.
   * 
   * @param groupName Retrieve a group.
   */
  public async retriveGroup(groupName: string): Promise<IGroup> {
    const url = `${this.endPoint}/${groupName}`;
    const group = (await this.rest.get(url)) as IGroup;

    return group;
  }

  /**
   * Crate a group.
   * 
   * @param name 
   * @param description 
   */
  public async createGroup(name: string, description: string): Promise<number> {
    const url = `${this.endPoint}`;

    const body = this.getBody(name, description);

    const resp = await this.rest.post(url, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return resp.statusCode;
  }

  /**
   * Delete a group.
   * 
   * @param groupName 
   */
  public async deleteGroup(groupName: string): Promise<number> {
    const url = `${this.endPoint}/${groupName}`;
    const status = await this.rest.delete(url);
    return status.statusCode;
  }

  /**
   * Update group.
   * 
   * @param groupName 
   * @param updatedName 
   * @param description 
   */
  public async updateGroup(groupName: string, updatedName: string, description: string): Promise<number> {
    const url = `${this.endPoint}/${groupName}`;
    const body = this.getBody(updatedName, description);
    const status = await this.rest.put(url, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return status.statusCode;
  }

  private getBody(name: string, description: string) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <group>
	    <name>${name}</name>
	    <description>${description}</description>
    </group>`;
  }
}

export default Group;
