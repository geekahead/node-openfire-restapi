import Chatroom from './class/Chatroom';
import Group from './class/Group';
import Message from './class/Message';
import User from './class/User';
import { Rest } from '../got';
import Security from './class/Security';
import System from './class/System';

export interface AdminOptions {
    apiUrl: string;
    secret: string;
    isJson: boolean;
}

export default class OpenfireAdmin {
    private rest: Rest;
    user: User;
    chatroom: Chatroom;
    group: Group;
    message: Message;
    security: Security;
    system: System;

    constructor(params: AdminOptions) {
        const { apiUrl, secret, isJson = true } = params;
        this.rest = new Rest(apiUrl, secret);
        this.user = new User(this.rest);
        this.chatroom = new Chatroom(this.rest);
        this.group = new Group(this.rest);
        this.message = new Message(this.rest);
        this.security = new Security(this.rest);
        this.system = new System(this.rest);
    }
}
