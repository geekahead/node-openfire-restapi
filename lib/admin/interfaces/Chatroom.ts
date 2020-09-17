
export interface IChatrooms {
    chatRooms: IChatroom[]
}

export interface IChatroom {
    roomName: string,
    naturalName: string,
    subject?: string,
    description:string,
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
    broadcastPresenceRoles?: Array<string>,
    owners?: Array<string>,
    admins?: Array<string>,
    members?: Array<string>,
    outcasts?: Array<string>
}


export type Roles = "owners" | "admins" | "members" | "outcasts";
export enum ChatroomsTypes {
    PUBLIC = "public",
    ALL = "all"
} 

export interface IOccupants {
    jid: string;
    userAddress: string;
    role: Roles;
    affiliation: string;
}