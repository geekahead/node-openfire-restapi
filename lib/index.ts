import Chatroom from './class/Chatroom';
import Group from './class/Group';
import Message from './class/Message';
import User from './class/User';
import { Rest } from './got';

interface OpenfireConstructor {
  apiUrl: string;
  secret: string;
  isJson: boolean;
}

class Openfire {
  private rest: Rest;
  user: User;
  chatroom: Chatroom;
  group: Group;
  message: Message;
  
  constructor(params: OpenfireConstructor) {
    const { apiUrl, secret, isJson = true } = params;
    this.rest = new Rest(apiUrl, secret);
    this.user = new User(this.rest);
    this.chatroom = new Chatroom(this.rest);
    this.group = new Group(this.rest);
    this.message = new Message(this.rest);
  }
}

export default Openfire;
