import { Timestamp } from "./common";

export interface ISecurityAuditLogs {
    logs: ISecurityAuditLog[];
}

export interface ISecurityAuditLog {
    logId: string;
    username: string;
    timestamp: Timestamp;
    summary: string;
    node: string;
    details: string;
}