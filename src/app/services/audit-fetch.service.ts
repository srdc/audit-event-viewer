import { ServerPaths } from 'app/services/server_paths.service';
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class AuditFetchService {

  count = '10';

  constructor(private http: Http,
              private serverPaths: ServerPaths) { }

  getPage(url: string) {
    return this.http.get(url);
  }

  getAudit(id: string) {
    return this.http.get(this.serverPaths.getAuditEventEndpoint() + '?_id=' + id);
  }

  getAuditsBetween(startDate: string, endDate: string) {
    startDate = startDate || 'NaN';
    endDate   =   endDate || 'NaN';
    const _start = new Date(startDate);
    const _end = new Date(endDate);
    if (!isNaN(_start.getDate())) {
      _start.setHours(0, 0, 0, 0);
      startDate = '&date=gt' + _start.toISOString();
    } else {
      startDate = '';
    }
    if (!isNaN(_end.getDate())) {
      _end.setHours(24, 0, 0, 0);
      endDate = '&date=lt' + _end.toISOString();
    } else {
      endDate = '';
    }
    return this.http.get(this.serverPaths.getAuditEventEndpoint() + '?_sort=-date&_count=' + this.count + startDate
      + endDate + '&entity-type:not=AuditEvent');
  }

  getAllAudits() {
    return this.http.get(this.serverPaths.getAuditEventEndpoint() + '?_sort=-date&_count=' + this.count + '&entity-type:not=AuditEvent');
  }

  getReference(url: string) {
    return this.http.get(url);
  }

}
