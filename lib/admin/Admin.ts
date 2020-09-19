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
    private restClient: RestClient;
    user: User;
    chatroom: Chatroom;
    group: Group;
    message: Message;
    security: Security;
    system: System;

    constructor(params: AdminOptions) {
        const { apiUrl, authorization, requestFormat, responseFormat} = params;
        this.restClient = new RestClient(apiUrl, authorization, requestFormat, responseFormat);
        this.user = new User(this.restClient);
        this.chatroom = new Chatroom(this.restClient);
        this.group = new Group(this.restClient);
        this.message = new Message(this.restClient);
        this.security = new Security(this.restClient);
        this.system = new System(this.restClient);
    }
}
