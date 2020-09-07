import { Rest } from '../got';
import { ISessions } from "../interfaces/User";
import { Response } from 'got/dist/source';

class Session {
    private endPoint = 'sessions';

    constructor(private rest: Rest) { }

    /**
     * Retrieve all user session.
     */
    public async getAllUserSession(): Promise<ISessions> {
        const url = `${this.endPoint}`;
        const sessions = (await this.rest.get(url)) as ISessions;
        return sessions;
    }

    /**
     * Retrieve a user sessions.
     * 
     * @param username 
     */
    public async getUserSessions(username: string): Promise<ISessions> {
        const url = `${this.endPoint}/${username}`;
        const sessions = (await this.rest.get(url)) as ISessions;
        return sessions;
    }

    /**
     * close a user sessions.
     * 
     * @param username 
     */
    public async closeUserSessions(username: string): Promise<number> {
        const url = `${this.endPoint}/${username}`;
        const { body, statusCode } = (await this.rest.get(url)) as Response;
        return statusCode;
    }
}