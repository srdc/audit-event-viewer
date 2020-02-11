import { Config } from './config.service';
import { Injectable } from '@angular/core';


@Injectable()
export class ServerPaths {
    constructor(private config: Config) {}

    /**
     * Returns pds Audit Event url
     *
     * @returns {string} url
     * @memberof ServerPaths
     */
    public getAuditEventEndpoint(): string {
        return this.config.getPdsServerUrl() + '/' + 'AuditEvent';
    }

}
