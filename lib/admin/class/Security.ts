import { RestClient } from '../../RestClient';
import { URLSearchParams } from 'url';
import { ISecurityParamters } from "../interfaces/common";
import { ISecurityAuditLogs } from '../interfaces/System';
import { UriBuilder } from '../../commons/UriBuilder';
import { Response } from 'got/dist/source';

class Security {
    private endPoint = 'logs/security';
    private endPointUri = UriBuilder.instance(this.endPoint);

    constructor(private rest: RestClient) { }

    /**
     * Get security audit logs.
     */
    public async getSecurityAuditLogs(securityParameters: ISecurityParamters): Promise<ISecurityAuditLogs> {
        const searchParams = new URLSearchParams(securityParameters as any);
        const result = (await this.rest.get(this.endPointUri.uri(), {
            "searchParams": searchParams.toString(),
        })) as Response<ISecurityAuditLogs>;
        return result.body
    }
}

export default Security;