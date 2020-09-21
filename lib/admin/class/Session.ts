import { RestClient } from '../../RestClient';
import { ISessions } from "../interfaces/User";
import { Response } from 'got/dist/source';
import { UriBuilder } from '../../commons/UriBuilder';

class Session {
    private endPoint = 'sessions';
    private endPointUri = UriBuilder.instance(this.endPoint);

    constructor(private rest: RestClient) { }

    /**
     * Retrieve all user session.
     * 
     * @returns Promise\<ISessions\>
     */
    public async getAllUserSession(): Promise<ISessions> {
        const url = this.endPointUri.uri();
        const result = (await this.rest.get(url)) as Response<ISessions>;
        return result.body;
    }

    /**
     * Retrieve a user sessions.
     * 
     * @param username 
     * @returns Promise\<ISessions\>
     */
    public async getUserSessions(username: string): Promise<ISessions> {
        const url = this.endPointUri.paths(username).uri();
        const result = (await this.rest.get(url)) as Response<ISessions>;
        return result.body;
    }

    /**
     * close a user sessions.
     * 
     * @param username 
     * @returns Promise\<{statusCode: number}\>
     */
    public async closeUserSessions(username: string): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths(username).uri();
        return (await this.rest.get(url)) as {statusCode: number};
    }
}

export default Session;