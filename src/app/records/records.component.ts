import {Component, DoCheck} from '@angular/core';
import {AuditFetchService} from '../services/audit-fetch.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuditEvent} from '../model/audit-event';
import {Base64} from 'app/services/base64.service';
import {DataStoreService} from '../services/data-store.service';

const pageReg = /_page=([0-9]+)/;

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements DoCheck {
  auditEvents: AuditEvent[] = [];

  outcomeDisplay: any = {
    '0': 'Success',
    '4': 'Minor Failure',
    '8': 'Serious Failure',
    '12': 'Major Failure'
  };

  firstPage: string;
  prevPage: string;
  selfPage: string;
  nextPage: string;
  lastPage: string;

  from: string;
  to: string;
  count = '25';

  oldFilter: any = {};
  filter: any = {
    crude: {
      'C': true,
      'R': true,
      'U': true,
      'D': true,
      'E': true
    },
    agent: {},
    outcome: {
      '0': true,
      '4': true,
      '8': true,
      '12': true
    },
    object: {}
  };

  toggleAll: any = {
    crude: true,
    agent: true,
    outcome: true,
    object: true
  };

  totalPages: string;
  currentPage: string;

  constructor(private auditFetchService: AuditFetchService, private base64: Base64, private dataService: DataStoreService) {
    dataService.detailedAudit = null;
    if (dataService.auditEvents) {
      this.auditEvents = dataService.auditEvents;
      this.firstPage = dataService.firstPage;
      this.prevPage = dataService.prevPage;
      this.selfPage = dataService.prevPage;
      this.nextPage = dataService.nextPage;
      this.lastPage = dataService.lastPage;
      this.from = dataService.from;
      this.to = dataService.to;
      this.count = dataService.count;
      this.filter = dataService.filter;
      this.toggleAll = dataService.toggleAll;
    } else {
      this.auditFetchService.getAllAudits()
        .map((res) => res.json() as any)
        .subscribe((bundle) => {
          if (bundle.link) {
            for (const link of bundle.link) {
              switch (link.relation) {
                case 'first':
                  this.firstPage = link.url;
                  break;
                case 'previous':
                  this.prevPage = link.url;
                  break;
                case 'next':
                  this.nextPage = link.url;
                  break;
                case 'last':
                  this.lastPage = link.url;
                  break;
                case 'self':
                  this.selfPage = link.url;
                  break;
                default:
              }
            }
            this.dataService.firstPage = this.firstPage;
            this.dataService.prevPage = this.prevPage;
            this.dataService.prevPage = this.selfPage;
            this.dataService.nextPage = this.nextPage;
            this.dataService.lastPage = this.lastPage;
            this.totalPages = (pageReg.test(this.lastPage) && pageReg.exec(this.lastPage)[1]) || '1';
            this.currentPage = (pageReg.test(this.selfPage) && pageReg.exec(this.selfPage)[1]) || '1';
          }
          const data = bundle.entry;
          if (data.length !== undefined) {
            data.forEach(resource => {
              const audit = new AuditEvent(resource, this.base64);
              this.auditEvents.push(audit);
              this.filter.agent[audit.triggeringSystem] = true;
              this.filter.agent[audit.targetSystem] = true;
              this.filter.agent[audit.requestor] = true;
              if (audit.object) { this.filter.object[audit.object] = true; }
            });
          } else if (data['fullUrl']) {
            const audit = new AuditEvent(data, this.base64);
            this.auditEvents.push(audit);
            this.filter.agent[audit.triggeringSystem] = true;
            this.filter.agent[audit.targetSystem] = true;
            this.filter.agent[audit.requestor] = true;
            if (audit.object) { this.filter.object[audit.object] = true; }
          }
          this.auditEvents = this.auditEvents.concat([]);
          this.dataService.auditEvents = this.auditEvents;
          this.dataService.filter = this.filter;
          this.dataService.toggleAll = this.toggleAll;
        }, (err) => { });
    }
  }

  getPage(url: string) {
    this.auditFetchService.getPage(url)
      .map((res) => res.json() as any)
      .subscribe((bundle) => {
        this.firstPage = null;
        this.prevPage = null;
        this.nextPage = null;
        this.lastPage = null;
        if (bundle.link) {
          for (const link of bundle.link) {
            switch (link.relation) {
              case 'first':
                this.firstPage = link.url;
                break;
              case 'previous':
                this.prevPage = link.url;
                break;
              case 'next':
                this.nextPage = link.url;
                break;
              case 'last':
                this.lastPage = link.url;
                break;
              case 'self':
                this.selfPage = link.url;
                break;
              default:
            }
          }
          this.dataService.firstPage = this.firstPage;
          this.dataService.prevPage = this.prevPage;
          this.dataService.prevPage = this.selfPage;
          this.dataService.nextPage = this.nextPage;
          this.dataService.lastPage = this.lastPage;
          this.totalPages = (pageReg.test(this.lastPage) && pageReg.exec(this.lastPage)[1]) || '1';
          this.currentPage = (pageReg.test(this.selfPage) && pageReg.exec(this.selfPage)[1]) || '1';
        }
        const data = bundle.entry;
        this.auditEvents = [];
        const agent = Object.assign({}, this.filter.agent);
        const object = Object.assign({}, this.filter.object);
        this.filter.agent = {};
        this.filter.object = {};
        if (data.length !== undefined) {
          data.forEach(resource => {
            const audit = new AuditEvent(resource, this.base64);
            this.auditEvents.push(audit);
            this.filter.agent[audit.targetSystem] = (agent.hasOwnProperty(audit.targetSystem)) ?
              agent[audit.targetSystem] : true;
            this.filter.agent[audit.triggeringSystem] = (agent.hasOwnProperty(audit.triggeringSystem)) ?
              agent[audit.triggeringSystem] : true;
            this.filter.agent[audit.requestor] = (agent.hasOwnProperty(audit.requestor)) ?
              agent[audit.requestor] : true;
            if (audit.object) {
              this.filter.object[audit.object] = (object.hasOwnProperty(audit.object)) ?
                object[audit.object] : true;
            }
          });
        } else if (data['fullUrl']) {
          const audit = new AuditEvent(data, this.base64);
          this.auditEvents.push(audit);
          this.filter.agent[audit.targetSystem] = (agent.hasOwnProperty(audit.targetSystem)) ?
            agent[audit.targetSystem] : true;
          this.filter.agent[audit.triggeringSystem] = (agent.hasOwnProperty(audit.triggeringSystem)) ?
            agent[audit.triggeringSystem] : true;
          this.filter.agent[audit.requestor] = (agent.hasOwnProperty(audit.requestor)) ?
            agent[audit.requestor] : true;
          if (audit.object) {
            this.filter.object[audit.object] = (object.hasOwnProperty(audit.object)) ?
              object[audit.object] : true;
          }
        }
        this.auditEvents = this.auditEvents.concat([]);
        this.dataService.auditEvents = this.auditEvents;
      }, (err) => { });
  }

  ngDoCheck(): void {
    if (JSON.stringify(this.filter) !== JSON.stringify(this.oldFilter)) {
      this.oldFilter.crude = Object.assign({}, this.filter.crude);
      this.oldFilter.agent = Object.assign({}, this.filter.agent);
      this.oldFilter.outcome = Object.assign({}, this.filter.outcome);
      this.oldFilter.object = Object.assign({}, this.filter.object);
      this.filter = {};
      this.filter.crude = Object.assign({}, this.oldFilter.crude);
      this.filter.agent = Object.assign({}, this.oldFilter.agent);
      this.filter.outcome = Object.assign({}, this.oldFilter.outcome);
      this.filter.object = Object.assign({}, this.oldFilter.object);
      this.dataService.filter = this.filter;
    }
  }

  setFrom(newDate: Date): void {
    this.from = newDate.toISOString().split('T')[0];
  }

  setTo(newDate: Date): void {
    this.to = newDate.toISOString().split('T')[0];
  }

  search() {
    this.dataService.from = this.from;
    this.dataService.to = this.to;
    this.dataService.count = this.count;
    this.auditFetchService.count = this.count;
    this.auditFetchService.getAuditsBetween(this.from, this.to)
      .map((res) => res.json() as any)
      .subscribe((bundle) => {
        this.firstPage = null;
        this.prevPage = null;
        this.nextPage = null;
        this.lastPage = null;
        if (bundle.link) {
          for (const link of bundle.link) {
            switch (link.relation) {
              case 'first':
                this.firstPage = link.url;
                break;
              case 'previous':
                this.prevPage = link.url;
                break;
              case 'next':
                this.nextPage = link.url;
                break;
              case 'last':
                this.lastPage = link.url;
                break;
              case 'self':
                this.selfPage = link.url;
                break;
              default:
            }
          }
          this.dataService.firstPage = this.firstPage;
          this.dataService.prevPage = this.prevPage;
          this.dataService.prevPage = this.selfPage;
          this.dataService.nextPage = this.nextPage;
          this.dataService.lastPage = this.lastPage;
        }
        const data = bundle.entry;
        this.auditEvents = [];
        const agent = Object.assign({}, this.filter.agent);
        const object = Object.assign({}, this.filter.object);
        this.filter.agent = {};
        this.filter.object = {};
        if (data.length !== undefined) {
          data.forEach(resource => {
            const audit = new AuditEvent(resource, this.base64);
            this.auditEvents.push(audit);
            this.filter.agent[audit.targetSystem] = (agent.hasOwnProperty(audit.targetSystem)) ?
              agent[audit.targetSystem] : true;
            this.filter.agent[audit.triggeringSystem] = (agent.hasOwnProperty(audit.triggeringSystem)) ?
              agent[audit.triggeringSystem] : true;
            this.filter.agent[audit.requestor] = (agent.hasOwnProperty(audit.requestor)) ?
              agent[audit.requestor] : true;
            if (audit.object) {
              this.filter.object[audit.object] = (object.hasOwnProperty(audit.object)) ?
                object[audit.object] : true;
            }
          });
        } else if (data['fullUrl']) {
          const audit = new AuditEvent(data, this.base64);
          this.auditEvents.push(audit);
          this.filter.agent[audit.targetSystem] = (agent.hasOwnProperty(audit.targetSystem)) ?
            agent[audit.targetSystem] : true;
          this.filter.agent[audit.triggeringSystem] = (agent.hasOwnProperty(audit.triggeringSystem)) ?
            agent[audit.triggeringSystem] : true;
          this.filter.agent[audit.requestor] = (agent.hasOwnProperty(audit.requestor)) ?
            agent[audit.requestor] : true;
          if (audit.object) {
            this.filter.object[audit.object] = (object.hasOwnProperty(audit.object)) ?
              object[audit.object] : true;
          }
        }
        this.auditEvents = this.auditEvents.concat([]);
        this.dataService.auditEvents = this.auditEvents;
      }, (err) => { });
  }

  toggleFilters(key: string): void {
    for (const e in this.filter[key]) {
      if (this.filter[key].hasOwnProperty(e)) {
        this.filter[key][e] = this.toggleAll[key];
      }
    }
    this.dataService.toggleAll = this.toggleAll;
  }
}
