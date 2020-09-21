/**
 * Wrapper function over got
 */

import got, { Got, OptionsOfTextResponseBody, Response, HTTPError, OptionsOfJSONResponseBody } from 'got';

export enum MediaType {
    JSON = "json",
    XML = "xml",
}

export type AcceptType = "json" | "buffer" | "text" | undefined;

export interface IAuthorization {
    toString(): string;
}

export class RestClient {
    private instance: Got;

    constructor(endPoint: string, authorization: IAuthorization, contentType: MediaType = MediaType.JSON, acceptType: AcceptType = "json") {
        this.instance = got.extend({
            "prefixUrl": endPoint,
            "responseType": acceptType,
            "headers": {
                "Authorization": authorization.toString(),
                "Content-Type": `application/${contentType.toString()}`,
                "Accept": `application/${acceptType}`
            },
        });
    }

    async get(url: string, options?: OptionsOfTextResponseBody): Promise<Response| object | Error> {
        try {
            return await this.instance.get(url, options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async post(url: string, options?: OptionsOfJSONResponseBody): Promise<Response> {
        try {
            return await this.instance.post(url, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async put(url: string, options?: OptionsOfTextResponseBody): Promise<Response> {
        try {
            return await this.instance.put(url, options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(url: string, options?: OptionsOfTextResponseBody): Promise<Response> {
        try {
            return await this.instance.delete(url, options);
        } catch (error) {
            throw new Error(error);
        }
    }
}
