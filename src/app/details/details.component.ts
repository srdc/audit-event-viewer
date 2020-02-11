import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuditFetchService} from '../services/audit-fetch.service';
import {AuditEvent} from '../model/audit-event';
import {Base64} from 'app/services/base64.service';
import {DataStoreService} from '../services/data-store.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  audit: AuditEvent;

  constructor(private route: ActivatedRoute, private router: Router, private auditFetchService: AuditFetchService,
              private dataService: DataStoreService, private base64: Base64) {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.dataService.detailedAudit = id;
      this.auditFetchService.getAudit(id)
        .map((res) => res.json() as any)
        .subscribe((bundle) => {

          if (bundle && bundle.total > 0) {
            this.audit = new AuditEvent(bundle.entry[0], base64);
          } else {
            this.audit = null;
          }
        });
    });
  }

  ngOnInit() { }

}
