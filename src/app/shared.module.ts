import { HttpModule } from '@angular/http';
import { DatePickerComponent } from './directives/date-picker/date-picker.component';
import { DatePickerDirective } from './directives/date-picker/date-picker.directive';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule
  ],
  declarations: [
    DatePickerComponent,
    DatePickerDirective
  ],
  exports: [
    DatePickerDirective,
    DatePickerComponent,
    FormsModule,
    TranslateModule,
    CommonModule,
    HttpModule
  ]
})
export class SharedModule {}
