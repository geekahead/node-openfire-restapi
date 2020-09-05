import { Rest } from '../got';
import { Response } from 'got/dist/source';
import { Properties, IPProperty } from '../interfaces/User';
import { IRetrieveSystemPropertiesRespose } from '../interfaces/System';

class System {
    private endPoint = 'system';
    constructor(private rest: Rest) {}

    /**
     * Retrieve all system properties.
     */
    public async getAllSystemProperties(): Promise<IRetrieveSystemPropertiesRespose> {
        const url = `${this.endPoint}/properties`;
        const systemProperties = (await this.rest.get(url)) as IRetrieveSystemPropertiesRespose;
        return systemProperties;
    }

    /**
     * Retrieve system property.
     * 
     * @param propertyName 
     */
    public async getSystemProperty(propertyName: string): Promise<object> {
        const url = `${this.endPoint}/properties/${propertyName}`;
        return (await this.rest.get(url)) as object;
    }

    /**
     * Create a system property.
     * 
     * @param property 
     */
    public async createSystemProperty(property: IPProperty): Promise<number> {
        const url = `${this.endPoint}/properties`;
        const { statusCode } = (await this.rest.post(url, {json: property}));
        return statusCode;
    }

    /**
     * Delete a system property.
     * 
     * @param propertyName 
     */
    public async deleteSystemProperty(propertyName: string): Promise<number> {
        const url = `${this.endPoint}/properties/${propertyName}`;
        const { statusCode } = (await this.rest.delete(url));
        return statusCode;
    }

    /**
     * Update a system property.
     * 
     * @param property 
     * 
     */
    public async updateSystemProperty(property: IPProperty): Promise<number> {
        const url = `${this.endPoint}/properties/${property["@key"]}`;
        const { statusCode } = (await this.rest.post(url, {json: property}));
        return statusCode;
    }

    public async getSessionsCount(): Promise<number> {
        const url = `${this.endPoint}/statistics/sessions`;
        const { sessionCount } = (await this.rest.get(url));
        return sessionCount;
    }
}