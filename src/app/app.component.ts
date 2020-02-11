import { TranslateService } from '@ngx-translate/core';
import { Config } from './services/config.service';
import { Router } from '@angular/router';
import { ServerPaths } from './services/server_paths.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { setTimeout } from 'timers';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, AfterViewInit {

  // Active Language
  activeLanguage = 'en';

  constructor(public config: Config,
              public router: Router) {}

  ngOnInit() {
    // Initialize default language
    this.config.setLanguage();
  }

  ngAfterViewInit() {
   // require('startbootstrap-sb-admin-2/dist/js/sb-admin-2.min.js')();
    setTimeout(function() {
      $('#side-menu').metisMenu();
      $(window).trigger('resize');
    }, 0);
  }

}
