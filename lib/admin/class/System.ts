import { RestClient } from '../../RestClient';
import { Response } from 'got/dist/source';
import { IProperties, IPProperty, ISessionsCount, IProperty } from '../interfaces/User';
import { UriBuilder } from '../../commons/UriBuilder';

class System {
    private endPoint = 'system';
    private endPointUri = UriBuilder.instance(this.endPoint);
    
    constructor(private rest: RestClient) {}

    /**
     * Retrieve all system properties.
     * 
     * @returns Promise\<IProperties\>
     */
    public async getAllSystemProperties(): Promise<IProperties> {
        const url = this.endPointUri.paths("properties").uri();
        return (await this.rest.get(url)) as IProperties;
    }

    /**
     * Retrieve system property.
     * 
     * @param propertyName 
     * @returns Promise\<object\>
     */
    public async getSystemProperty(propertyName: string): Promise<IProperty> {
        const url = this.endPointUri.paths("properties", propertyName).uri();
        return (await this.rest.get(url)) as IProperty;
    }

    /**
     * Create a system property.
     * 
     * @param property 
     * @returns Promise\<{statusCode: number}\>
     */
    public async createSystemProperty(property: IProperty): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths("properties").uri();
        return await this.rest.post(url, {json: property});
    }

    /**
     * Delete a system property.
     * 
     * @param propertyName 
     * @returns Promise\<{statusCode: number}\> 
     */
    public async deleteSystemProperty(propertyName: string): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths("properties", propertyName).uri();
        return await this.rest.delete(url);
    }

    /**
     * Update a system property.
     * 
     * @param property 
     * @returns Promise\<{statusCode: number}\>
     */
    public async updateSystemProperty(property: IProperty): Promise<{statusCode: number}> {
        const url = this.endPointUri.paths("properties", property.key).uri();
        return await this.rest.put(url, {json: property});
    }

    /**
     * Retrieve session counts.
     */
    public async getSessionsCount(): Promise<ISessionsCount> {
        const url = this.endPointUri.paths("statistics", "sessions").uri();
        return (await this.rest.get(url)) as ISessionsCount;
    }
}

export default System;