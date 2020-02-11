import { Injectable } from '@angular/core';
import {AuditEvent} from '../model/audit-event';

@Injectable()
export class DataStoreService {
  detailedAudit: string;
  auditEvents: AuditEvent[];
  firstPage: string;
  prevPage: string;
  selfPage: string;
  nextPage: string;
  lastPage: string;
  from: string;
  to: string;
  count: string;
  filter: any;
  toggleAll: any;

  constructor() { }

}
