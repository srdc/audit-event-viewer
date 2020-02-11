import { CollectionUtil } from './util/collection_util';
import { Base64 } from './services/base64.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule, Routes, CanActivate } from '@angular/router';
import { ServerPaths } from './services/server_paths.service';
import { APP_BASE_HREF } from '@angular/common';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Config, getRootUrl } from './services/config.service';

import { AppComponent } from './app.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { OnauthMissingTranslationHandler } from './util/missing-translation.handler';
import { SharedModule } from 'app/shared.module';
import {RecordsComponent} from './records/records.component';
import {OutcomeFilterPipe} from './pipes/outcome-filter.pipe';
import {DetailsComponent} from './details/details.component';
import {DropdownDirective} from './directives/dropdown/dropdown.directive';
import {ObjectFilterPipe} from './pipes/object-filter.pipe';
import {CrudeFilterPipe} from './pipes/crude-filter.pipe';
import {GetKeysPipe} from './pipes/get-keys.pipe';
import {HighlightDirective} from './directives/highlight/highlight.directive';
import {AgentFilterPipe} from './pipes/agent-filter.pipe';
import {InlineArrayPipe} from './pipes/inline-array.pipe';
import {MomentModule} from 'angular2-moment';
import {AuditFetchService} from './services/audit-fetch.service';
import {DataStoreService} from './services/data-store.service';



const appRoutes: Routes = [
  { path: '', component: RecordsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', redirectTo: ''}
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    CrudeFilterPipe,
    DropdownDirective,
    HighlightDirective,
    GetKeysPipe,
    AgentFilterPipe,
    OutcomeFilterPipe,
    ObjectFilterPipe,
    RecordsComponent,
    DetailsComponent,
    InlineArrayPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: OnauthMissingTranslationHandler},
      useDefaultLang: false
    }),
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy }
    ),
    MomentModule,
  ],
  providers: [
    Config,
    ServerPaths,
    HttpClient,
    Base64,
    SelectivePreloadingStrategy,
    CollectionUtil,
    AuditFetchService,
    DataStoreService,
    {
      provide: APP_BASE_HREF,
      useFactory: getRootUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
