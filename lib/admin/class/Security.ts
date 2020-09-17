import { RestClient } from '../../RestClient';
import { URLSearchParams } from 'url';
import { ISecurityParamters } from "../interfaces/common";
import { ISecurityAuditLogs } from '../interfaces/System';

class Security {
    private endPoint = '/logs/security';

    constructor(private rest: RestClient) { }

    /**
     * Get security audit logs.
     */
    public async getSecurityAuditLogs(securityParameters: ISecurityParamters): Promise<ISecurityAuditLogs> {
        const searchParams = new URLSearchParams(securityParameters as any);
        const logs = (await this.rest.get(this.endPoint, {
          searchParams: searchParams.toString(),
        })) as ISecurityAuditLogs;
        return logs;
    }
}

export default Security;