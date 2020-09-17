import Chatroom from './class/Chatroom';
import Group from './class/Group';
import Message from './class/Message';
import User from './class/User';
import { RestClient, IAuthorization, RequestFormat, ResponseFormat } from '../RestClient';
import Security from './class/Security';
import System from './class/System';

export interface AdminOptions {
    apiUrl: string;
    authorization: IAuthorization;
    requestFormat?: RequestFormat;
    responseFormat?: ResponseFormat;
}

export default class OpenfireAdmin {
    private rest: RestClient;
    user: User;
    chatroom: Chatroom;
    group: Group;
    message: Message;
    security: Security;
    system: System;

    constructor(params: AdminOptions) {
        const { apiUrl, authorization, requestFormat, responseFormat} = params;
        this.rest = new RestClient(apiUrl, authorization, requestFormat, responseFormat);
        this.user = new User(this.rest);
        this.chatroom = new Chatroom(this.rest);
        this.group = new Group(this.rest);
        this.message = new Message(this.rest);
        this.security = new Security(this.rest);
        this.system = new System(this.rest);
    }
}
