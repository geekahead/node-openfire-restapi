import { RestClient } from '../../RestClient';
import { Response } from 'got/dist/source';
import { IChatroom, Roles as Roles, ChatroomsTypes, IOccupants, IChatrooms, IParticipants, IChatMessages } from '../interfaces/Chatroom';
import { UriBuilder } from "../../commons/UriBuilder";

/**
 * All the endpoints related to chatroom
 * @see https://www.igniterealtime.org/projects/openfire/plugins/1.3.8/restAPI/readme.html#chat-room-related-rest-endpoints
 */
class Chatroom {
    private endPoint = 'chatrooms';
    /**
     * 
     * @param restClient 
     */
    constructor(private restClient: RestClient) { }

    /**
     * Create a chat room
     * @description Endpoint to create a new chat room.
     * 
     * @param data 
     * @param servicename 
     * @returns Promise\<{statusCode: number, statusMessage: string}\>
     */
    public async createChatroom(
        data: IChatroom, servicename: string = 'conference'
    ): Promise<{ statusCode: number, statusMessage: string | undefined }> {
        return (await this.restClient.post(this.endPoint, {
            json: data,
            searchParams: {
                servicename,
            },
        })) as { statusCode: number, statusMessage: string | undefined };
    }

    /**
     * Update chart room.
     * 
     * @param data 
     * @param servicename 
     * @returns Promise\<{statusCode: number}\>
     */
    public async updateChatroom(data: IChatroom, servicename: string = 'conference'): Promise<{statusCode: number}> {
        // const url = `${this.endPoint}/${data.roomName}`;
        const url = UriBuilder.instance().concat(this.endPoint).slash().concat(data.roomName).toString();
        return await this.restClient.put(url, {
            json: data,
            searchParams: {
                servicename,
            },
        });
    }

    /**
     * Delete a chat room
     * @description Endpoint to delete a chat room.
     * @param servicename 
     * @returns Promise\<{statusCode: number}\>
     */
    public async deleteChatroom(roomname: string, servicename: string = 'conference'): Promise<{statusCode: number}> {
        const url = `${this.endPoint}/${roomname}`;
        return await this.restClient.delete(url, { "searchParams": { "servicename": servicename } });
    }

    /**
     * Retrieve a chat room
     * @description Endpoint to get information over specific chat room
     * 
     * @param roomname 
     * @param servicename 
     * 
     * @returns Promise\<IChatroom\>
     */
    public async getChatroom(roomname: string, servicename: string = 'conference'): Promise<IChatroom> {
        // const url = `${this.endPoint}/${roomname}`;
        const url = UriBuilder.instance().concat(this.endPoint).slash().concat(roomname).toString();
        const room = (await this.restClient.get(url, { "searchParams": { "servicename": servicename } })) as IChatroom;
        return room;
    }


    /**
     * Retrieve all chat rooms
     * @description Endpoint to get all chat rooms
     * 
     * @param search 
     * @param type 
     * @param servicename 
     * @returns Promise\<IChatrooms\>
     */
    public async getAllChatrooms(servicename: string = 'conference', type: ChatroomsTypes = ChatroomsTypes.PUBLIC
        ,search?: string): Promise<IChatrooms> {
        const url = UriBuilder.instance(this.endPoint).toString();

        const rooms = (await this.restClient.get(url, {
            "searchParams": {
                "servicename": servicename,
                "type": type,
                "search": search
            },
        })) as IChatrooms;

        return rooms;
    }

    /**
     * Retrieve chat room participants
     * @description Endpoint to get all participants with a role of specified room.
     * 
     * @param roomname 
     * @param servicename
     * @returns Promise\<IParticipants\>
     */
    public async getChatroomParticipants(roomname: string, servicename: string = 'conference'): Promise<IParticipants> {
        const url = UriBuilder.instance(this.endPoint).slash().concat(roomname).slash().concat("participants").toString();
        const participants = (await this.restClient.get(url, { "searchParams": { "servicename": servicename } })) as IParticipants;
        return participants;
    }

    /**
     * Retrieve chat room occupants
     * Endpoint to get all occupants (all roles / affiliations) of a specified room.
     * 
     * @param roomname 
     * @param servicename 
     * @returns Promise\<IOccupants\>
     */
    public async getChatroomOccupants(roomname: string, servicename: string = 'conference'): Promise<IOccupants> {
        const url = UriBuilder.instance(this.endPoint).slash().concat("roomname").slash().concat("occupants").toString();
        const occupants = (await this.restClient.get(url, { "searchParams": { "servicename": servicename } })) as IOccupants;
        return occupants;
    }

    /**
     * Retrieve chat room message history
     * @description Endpoint to get the chat message history of a specified room.
     * 
     * @param roomname 
     * @param servicename 
     * @returns Promise\<IChatMessages\>
     */
    public async getChatroomHistory(roomname: string, servicename: string = 'conference'): Promise<IChatMessages> {
        const url = UriBuilder.instance(this.endPoint).slash().concat(roomname).slash().concat("chathistory").toString();
        const chatHistory = (await this.restClient.get(url, { "searchParams": { "servicename": servicename } })) as IChatMessages;
        return chatHistory;
    }

    /**
     * Invite user to a chat Room
     * @description Endpoint to invite a user to a room.
     * 
     * @param roomname 
     * @param username 
     * @param reason 
     * @returns Promise\<{statusCode: number}\>
     */
    public async inviteUserToChatroom(roomname: string, username: string, reason = ''): Promise<{statusCode: number}> {
        const url = UriBuilder.instance(this.endPoint).slash().concat(roomname).slash().concat("invite").slash().concat(username).toString();
        const body = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <mucInvitation>
            <reason>${reason}</reason>
        </mucInvitation>`;

        // const resp = await this.rest.post(url, {
        //     body,
        //     headers: { 'Content-Type': 'application/xml' },
        // });

        return await this.restClient.post(url, {
            "json": {
                "reason": reason
            }
        });
    }

    /**
     * Add user with role to chat room
     * @description Endpoint to add a new user with role to a room.
     * 
     * @param roomname 
     * @param username 
     * @param roles 
     * @param servicename 
     * @returns Promise\<{ statusCode: number, statusMessage: string }\>
     */
    public async addUserToChatroom(roomname: string, username: string, roles: Roles
        , servicename: string = 'conference'): Promise<{ statusCode: number, statusMessage: string }> {
        const url = UriBuilder.instance(this.endPoint).slash().concat(roomname).slash().concat(roles).slash().concat(username).uri();
        return (await this.restClient.post(url,
            {
                "searchParams":
                    { "servicename": servicename }
            })) as { statusCode: number, statusMessage: string };
    }

    /**
     * Add group with role to chat room
     * @description Endpoint to add a new group with role to a room.
     * 
     * @param roomname 
     * @param groupname 
     * @param roles 
     * @param servicename 
     * @returns Promise\<{ statusCode: number, statusMessage: string }\> 
     */
    public async addGroupToChatroom(roomname: string, groupname: string, roles: Roles
        , servicename: string = 'conference'): Promise<{ statusCode: number, statusMessage: string }> {
        const url = UriBuilder.instance(this.endPoint).slash().concat(roomname).slash().concat(roles).slash().concat(groupname).uri();
        return (await this.restClient.post(url,
            {
                "searchParams":
                    { "servicename": servicename }
            })) as { statusCode: number, statusMessage: string };
    }

    /**
     * Delete a user from a chat room.Endpoint to remove a room user role.
     * @param roomname 
     * @param username 
     * @param roles 
     * @param servicename 
     * @returns Promise\<{statusCode: number}\> 
     */
    public async deleteUserFromChatroom(roomname: string, username: string, roles: Roles
        , servicename: string = 'conference'): Promise<{statusCode: number}> {
        const url = UriBuilder.instance(this.endPoint).slash().concat(roomname).slash().concat(roles).slash().concat(username).uri();
        return (await this.restClient.delete(url,
            {
                "searchParams":
                    { "servicename": servicename }
            }));
    }
}

export default Chatroom;
