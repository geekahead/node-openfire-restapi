import { ChatType } from "@xmpp/client";

export interface IChatrooms {
    chatRooms: IChatroom[]
}

export interface IChatroom {
    roomName: string,
    naturalName: string,
    subject?: string,
    description: string,
    creationDate?: string,
    modificationDate?: string,
    maxUsers?: number,
    persistent?: boolean,
    publicRoom?: boolean,
    registrationEnabled?: boolean,
    canAnyoneDiscoverJID?: boolean,
    canOccupantsChangeSubject?: boolean,
    canOccupantsInvite?: boolean,
    canChangeNickname?: boolean,
    logEnabled?: boolean,
    loginRestrictedToNickname?: boolean,
    membersOnly?: boolean,
    moderated?: boolean,
    broadcastPresenceRoles?: string[],
    owners?: string[],
    admins?: string[],
    members?: string[],
    outcasts?: string[]
}


export enum Roles {
    OWNERS = "owners",
    ADMINS = "admins",
    MEMBERS = "members",
    OUTCASTS = "outcasts",
    PARTICIPANT = "participant",
    VISITOR = "visitor",
    MODERATOR = "monderator"
}

export enum ChatroomsTypes {
    PUBLIC = "public",
    ALL = "all"
}

export interface IParticipant {
    jid: string;
    role: Roles;
    affiliation: string;
}

export interface IParticipants {
    participants: IParticipant[]
}

export interface IOccupant {
    jid: string;
    userAddress: string;
    role: Roles;
    affiliation: string;
}

export interface IOccupants {
    occupants: IOccupant[]
}

export interface IChatMessages {
    message: IChatMessage[]
}

export interface IChatMessage {
    from: string;
    to: string;
    type: ChatType;
    delay_from: string;
    delay_stamp: string;
    body: string;
}