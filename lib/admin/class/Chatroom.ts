import { Rest } from '../../got';
import { Response } from 'got/dist/source';
import { IChatroom, Roles, ChatroomsTypes, IOccupants } from '../interfaces/Chatroom';

/**
 * All the endpoints related to chatroom
 * @see https://www.igniterealtime.org/projects/openfire/plugins/1.3.8/restAPI/readme.html#chat-room-related-rest-endpoints
 */
class Chatroom {
  private endPoint = 'chatrooms';
  constructor(private rest: Rest) {}

  /**
   * Create a chat room
   * @description Endpoint to create a new chat room.
   * 
   * @param data 
   * @param servicename 
   */
  public async createChatroom(
    data: IChatroom, servicename = 'conference'
  ): Promise<{ statusMessage: string | undefined; statusCode: number }> {
    const { statusCode, statusMessage } = (await this.rest.post(this.endPoint, {
      json: data,
      searchParams: {
        servicename,
      },
    })) as Response;
    return {
      statusCode,
      statusMessage,
    };
  }

  public async updateChatroom(data: IChatroom, servicename = 'conference'): Promise<number> {
    const url = `${this.endPoint}/${data.roomName}`;
    const response = await this.rest.put(url, {
      json: data,
      searchParams: {
        servicename,
      },
    });

    return response.statusCode;
  }

  /**
   * Retrieve a chat room
   * @description Endpoint to get information over specific chat room
   * 
   * @param roomname 
   * @param servicename 
   */
  public async getChatroom(roomname: string, servicename = 'conference'): Promise<IChatroom> {
    const url = `${this.endPoint}/${roomname}`;
    const room = (await this.rest.get(url, {
      searchParams: {
        servicename,
      },
    })) as IChatroom;

    return room;
  }

  /**
   * Retrieve chat room participants
   * @description Endpoint to get all participants with a role of specified room.
   * 
   * @param roomname 
   * @param servicename 
   */
  public async getChatroomParticipants(roomname: string, servicename = 'conference') {
    const url = `${this.endPoint}/${roomname}/participants`;
    const participants = (await this.rest.get(url, { searchParams: { servicename } })) as Object;
    return participants;
  }

  /**
   * Retrieve chat room occupants
   * Endpoint to get all occupants (all roles / affiliations) of a specified room.
   * 
   * @param roomname 
   * @param servicename 
   */
  public async getChatroomOccupants(roomname: string, servicename = 'conference'): Promise<IOccupants> {
    const url = `${this.endPoint}/${roomname}/occupants`;
    const occupants = (await this.rest.get(url, { searchParams: { servicename } })) as IOccupants;
    return occupants;
  }

  /**
   * Retrieve chat room message history
   * @description Endpoint to get the chat message history of a specified room.
   * 
   * @param roomname 
   * @param servicename 
   */
  public async getChatroomHistory(roomname: string, servicename = 'conference'): Promise<Object> {
    const url = `${this.endPoint}/${roomname}/chathistory`;
    const chatHistory = (await this.rest.get(url, { searchParams: { servicename } })) as Object;
    return chatHistory;
  }

  /**
   * Retrieve all chat rooms
   * @description Endpoint to get all chat rooms
   * 
   * @param search 
   * @param type 
   * @param servicename 
   */
  public async getAllChatrooms(
    search: string = '',
    type: ChatroomsTypes = 'public',
    servicename = 'conference',
  ): Promise<Array<IChatroom>> {
    const url = `${this.endPoint}`;

    const rooms = (await this.rest.get(url, {
      searchParams: {
        servicename,
        search,
        type,
      },
    })) as Array<IChatroom>;

    return rooms;
  }

  /**
   * Delete a chat room
   * @description Endpoint to delete a chat room.
   */
  public async deleteChatroom(roomname: string, servicename = 'conference'): Promise<number> {
    const url = `${this.endPoint}/${roomname}`;
    const status = await this.rest.delete(url, { searchParams: { servicename } });
    return status.statusCode;
  }

  /**
   * Add user with role to chat room
   * @description Endpoint to add a new user with role to a room.
   * 
   * @param roomname 
   * @param username 
   * @param roles 
   * @param servicename 
   */
  public async addUserToChatroom(
    roomname: string,
    username: string,
    roles: Roles,
    servicename = 'conference',
  ) {
    const url = `${this.endPoint}/${roomname}/${roles}/${username}`;
    const { statusCode, statusMessage } = (await this.rest.post(url, {
      searchParams: { servicename },
    })) as Response;
    return {
      statusCode,
      statusMessage,
    };
  }

  /**
   * Add group with role to chat room
   * @description Endpoint to add a new group with role to a room.
   * 
   * @param roomname 
   * @param groupname 
   * @param roles 
   * @param servicename 
   */
  public async addGroupToChatroom(
    roomname: string,
    groupname: string,
    roles: Roles,
    servicename = 'conference',
  ) {
    const url = `${this.endPoint}/${roomname}/${roles}/${groupname}`;
    const { statusCode, statusMessage } = (await this.rest.post(url, {
      searchParams: { servicename },
    })) as Response;
    return {
      statusCode,
      statusMessage,
    };
  }

  /**
   * Invite user to a chat Room
   * @description Endpoint to invite a user to a room.
   * 
   * @param roomname 
   * @param username 
   * @param reason 
   */
  public async inviteUserToChatroom(roomname: string, username: string, reason = '') {
    const url = `${this.endPoint}/${roomname}/invite/${username}`;
    const body = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <mucInvitation>
            <reason>${reason}</reason>
        </mucInvitation>`;

    const resp = await this.rest.post(url, {
      body,
      headers: { 'Content-Type': 'application/xml' },
    });

    return {
      statusCode: resp.statusCode,
      statusMessage: resp.statusMessage,
    };
  }

  /**
   * Delete a user from a chat room
   * Endpoint to remove a room user role.
   * 
   * @param roomname 
   * @param username 
   * @param roles 
   * @param servicename 
   */
  public async deleteUserFromChatroom(
    roomname: string,
    username: string,
    roles: Roles,
    servicename = 'conference',
  ): Promise<number> {
    const url = `${this.endPoint}/${roomname}/${roles}/${username}`;
    const status = await this.rest.delete(url, { searchParams: { servicename } });
    return status.statusCode;
  }
}

export default Chatroom;
