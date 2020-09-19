import { RestClient } from '../../RestClient';
import { URLSearchParams } from 'url';
import { IParamUser, IRetriveUserSearch, IRetriveUsersResponse, IUser, IGroupNames } from '../interfaces/User';
import { RosterObject, RosterItem } from '../interfaces/Roster';
import { Response } from 'got/dist/source';
import Helper from '../../helper';
import { Logger as logger, E_Log_Level } from "../../commons/logger/Logger"
import { UriBuilder } from '../../commons/UriBuilder';

logger.setLevel(E_Log_Level.Trace);

class User {
    private endPoint = 'users';
    private endPointUri = UriBuilder.instance(this.endPoint);

    /**
     * Constructor.
     * 
     * @param restClient 
     */
    constructor(private restClient: RestClient) {
    }

    /**
     * Retrieve users
     * @description Endpoint to get all or filtered users
     * 
     * @param query 
     * @returns Promise\<IRetriveUsersResponse\>
     */
    public async retriveUsers(query: IRetriveUserSearch): Promise<IRetriveUsersResponse> {
        const searchParams = new URLSearchParams(query as any);
        return  (await this.restClient.get(this.endPoint, {
            "searchParams": searchParams.toString(),
        })) as IRetriveUsersResponse;
    }

    /**
     * Retrieve a user
     * @description Endpoint to get information over a specific user
     * 
     * @param username 
     * @returns Promise\<IUser\>
     */
    public async retriveUser(username: string): Promise<IUser> {
        const url = UriBuilder.instance().paths(this.endPoint, username).uri();
        return (await this.restClient.get(url)) as IUser;
    }

    /**
     * Create a user
     * @description Endpoint to create a new user
     * 
     * @param data 
     * @returns Promise\<{ statusCode: number, statusMessage: string | undefined }\>
     */
    public async createUser(
        data: IParamUser,
    ): Promise<{ statusCode: number, statusMessage: string | undefined }> {
        return (await this.restClient.post(this.endPoint, {
            json: data,
        })) as { statusCode: number, statusMessage: any };
    }

    /**
     * Delete a user
     * @description Endpoint to delete a user
     * 
     * @param username 
     * @return Promise\<{ statusCode: number, body: object }\>
     */
    public async deleteUser(username: string): Promise<{ statusCode: number, body: object }> {
        const uri = this.endPointUri.paths(username).uri();
        return (await this.restClient.delete(uri)) as { statusCode: number, body: object };
    }

    /**
     * Update a user
     * @description Endpoint to update / rename a user
     * 
     * @param username 
     * @param data 
     * @returns Promise\<{statusCode: number}\>
     */
    public async updateUser(username: string, data: IParamUser): Promise<{statusCode: number}> {
        const uri = this.endPointUri.paths(username).uri();
        return await this.restClient.put(uri, { json: data });
    }

    /**
     * Retrieve all user groups
     * TODO : Add return type
     * @description Endpoint to get group names of a specific user
     * 
     * @param username 
     * @returns Promise\<IGroupNames\>
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
     * @returns Promise\<IGroupNames\>
     */
    public async getUserGroups(username: string): Promise<IGroupNames> {
        const url = this.endPointUri.paths(username, "groups").uri();
        const groups = await this.restClient.get(url) as IGroupNames;
        return groups;
    }

    /**
     * Add user to groups
     * @description Endpoint to add user to a group
     * 
     * @param username 
     * @param groups 
     * @returns Promise\<{statusCode: number}\>
     */
    public async addUserToGroups(username: string, groupNames: IGroupNames): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths(username, "groups").uri();
        return await this.restClient.post(url, { json: groupNames });
    }

    /**
     * Add user to group
     * @description Endpoint to add user to a group
     * 
     * @param username 
     * @param groupname
     * @returns Promise<{statusCode: number}>
     */
    public async addUserToGroup(username: string, groupname: string): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths(username, "groups", groupname).uri();
        return await this.restClient.post(url);
    }

    /**
     * Delete a user from a group
     * TODO add types
     * @description Endpoint to remove a user from a groups
     * 
     * @param username 
     * @param groupName 
     * @returns Promise\<{ statusCode: number, body: object }\>
     */
    public async deleteUserFromGroups(username: string, groupNames: IGroupNames): Promise<{ statusCode: number, body: object }> {
        const url = this.endPointUri.paths(username, "groups").uri();
        return (await this.restClient.delete(url, { json: groupNames })) as { statusCode: number, body: object }
    };


    /**
     * Delete a user from a group
     * TODO add types
     * @description Endpoint to remove a user from a group
     * 
     * @param username 
     * @param groupname
     * @returns Promise\<{statusCode: number}\> 
     */
    public async deleteUserFromGroup(username: string, groupname: string): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths(username, "groups", groupname).uri();;
        return await this.restClient.delete(url);
    }

    /**
     * Lockout a user
     * @description  Endpoint to lockout / ban the user from the chat server.
     * The user will be kicked if the user is online.
     * 
     * @param username 
     * @returns Promise\<{statusCode: number}\>
     */
    public async lockoutUser(username: string): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths("lockouts", username).uri();
        return await this.restClient.post(url);
    }

    /**
     * 
     * @param username 
     * @returns Promise\<{statusCode: number}\>
     */
    public async unlockUser(username: string): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths("lockouts", username).uri();
        return await this.restClient.delete(url);
    }

    /**
     * Retrieve user roster
     * Endpoint to get roster entries (buddies) from a specific user
     * 
     * @param username 
     * @returns Promise\<RosterObject\>
     */
    public async retriveUserRoster(username: string): Promise<RosterObject> {
        const uri = this.endPointUri.paths(username, "roster").uri();
        return (await this.restClient.get(uri)) as RosterObject;
    }

    /**
     * Create a user roster entry
     * !not working
     * 
     * @param username 
     * @param rooster 
     * @returns Promise\<{statusCode: number}\>
     */
    public async createUserRoster(username: string, rooster: RosterItem): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths(username, "roster").uri();
        return await this.restClient.post(url, {
            json: rooster });
    }

    /**
     * Delete a user roster entry
     * 
     * @param username
     * @param jid 
     * @returns Promise\<{statusCode: number}\>
     */
    public async deleteUserRoster(username: string, jid: string): Promise<{statusCode: number}> {
        const uri = this.endPointUri.paths(username, "roster", jid).uri();
        return await this.restClient.delete(uri);
    }

    /**
     * Update a user roster entry
     * 
     * @param username 
     * @param rosterItem 
     * @returns Promise\<{statusCode: number}\>
     */
    public async updateUserRoster(username: string, rosterItem: RosterItem): Promise<{statusCode: number}> {
        const uri = this.endPointUri.paths(username, "roster", rosterItem.jid).uri();
        return await this.restClient.put(uri, { json: rosterItem });
    }
}

export default User;
