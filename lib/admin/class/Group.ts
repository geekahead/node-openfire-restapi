import { RestClient } from '../../RestClient';

/**
 * All api params related to groups
 * @see https://www.igniterealtime.org/projects/openfire/plugins/1.3.8/restAPI/readme.html#group-related-rest-endpoints
 */

import {IGroup, IGroups} from '../interfaces/User';
import { UriBuilder } from '../../commons/UriBuilder';

class Group {
  private endPoint = 'groups';
  private endPointUri = UriBuilder.instance(this.endPoint);
  
  constructor(private rest: RestClient) {}

  /**
   * Retrieve all groups.
   * @returns Promise\<IGroups\>
   */
  public async getAllGroups(): Promise<IGroups> {
    const url = this.endPointUri.uri();
    return (await this.rest.get(url)) as IGroups;
  }

  /**
   * Retrieve a group.
   * 
   * @param groupName Retrieve a group.
   * @returs Promise\<IGroup\>
   */
  public async getGroup(groupName: string): Promise<IGroup> {
    const url = this.endPointUri.paths(groupName).uri();
    return (await this.rest.get(url)) as IGroup;
  }

  /**
   * Crate a group.
   * 
   * @param name 
   * @param description 
   * @returns Promise\<{statusCode: number}\>
   */
  public async createGroup(name: string, description: string): Promise<{statusCode: number}> {
    const url = this.endPointUri.uri();
    return await this.rest.post(url, {
        json: {
            "name": name,
            "description": description
        }
    });
  }

  /**
   * Delete a group.
   * 
   * @param groupName 
   * @returns Promise\<{statusCode: number}\>
   */
  public async deleteGroup(groupName: string): Promise<{statusCode: number}> {
    const url = this.endPointUri.paths(groupName).uri();
    return await this.rest.delete(url);
  }

  /**
   * Update group.
   * 
   * @param groupName 
   * @param updatedName 
   * @param description 
   * @returns Promise\<{statusCode: number}\>
   */
  public async updateGroup(groupName: string, description: string): Promise<{statusCode: number}> {
    const url = this.endPointUri.paths(groupName).uri();
    return await this.rest.put(url, {
        json: {
            "name": groupName,
            "description": description
        }
    });
  }

//   private getBody(name: string, description: string) {
//     return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//     <group>
// 	    <name>${name}</name>
// 	    <description>${description}</description>
//     </group>`;
//   }
}

export default Group;
