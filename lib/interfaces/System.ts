import { Properties } from "./User";
import { Timestamp } from "./common";

export interface ISystemProperties {
    properties: Properties;
}

export interface ISecurityAuditLogs {
    logId: string;
    username: string;
    timestamp: Timestamp;
    summary: string;
    node: string;
    details: string;
}