export enum SubscriptionType {
    REMOVE = -1,
    NONE = 0,
    TO = 1,
    FROM = 2,
    BOTH = 3
}

export interface RosterItem {
  jid: string;
  nickname?: string;
  subscriptionType?: SubscriptionType;
  groups?: string[];
}

export interface RosterObject {
  rosterItem: RosterItem[];
}
