import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

export function getRootUrl() {
    return '/';
}

@Injectable()
export class Config {

    constructor(
        public translateService: TranslateService
    ) { }

    // Getters for the various local storage item keys

    public getLastVisitedUrlKey(): string {
        return 'lastVisitedUrlKey';
    }

    public getLocaleKey(): string {
        return 'app-locale';
    }

    public getMenuItems(): any[] {
      return [{
        'menuId' : 'language',
        'scope' : null,
        'routerLink': null,
        'location': 'top',
        'icon' : 'fa fa-language fa-fw',
        'children' : [
          {
            'menuId' : 'en',
            'scope' : null,
            'routerLink' : null,
            'icon' : 'flag-icon flag-icon-us',
            'children' : null
          },
          {
            'menuId' : 'sv',
            'scope' : null,
            'routerLink' : null,
            'icon' : 'flag-icon flag-icon-se',
            'children' : null
          },
          {
            'menuId' : 'es',
            'scope' : null,
            'routerLink' : null,
            'icon' : 'flag-icon flag-icon-es',
            'children' : null
          }
        ]
      }];
    }

    /**
     * Checks the configuration file for the pds server url and
     * returns it.
     *
     * @returns {string} pds server url
     * @memberof Config
     */
    public getPdsServerUrl(): string {
        if ((environment.pds_path + '').startsWith('http')) {
            return environment.pds_path;
        } else {
            return window.location.protocol + '//' + window.location.host + '/' + environment.pds_path;
        }
    }


    /**
     * Returns stored application locale for the user
     *
     * @returns {string} Locale of the application if stored
     * @memberof Config
     */
    public getLocaleConfiguration(): string {
        const locale = localStorage[this.getLocaleKey()];
        if (locale) {
            return locale;
        }
        return 'en';
    }

    /**
     * Sets the locale of the application
     *
     * @param locale new locale
     * @memberof Config
     */
    public setLocaleConfiguration(locale: string) {
        localStorage[this.getLocaleKey()] = locale;
    }


    /**
   * Changes the language of the application, initializes app if no input language is provided.
   *
   * @param newLocale Language to be set to the application
   * @memberof AppComponent
   */
  public setLanguage(newLocale?: string): void {
    // Set and save input locale
    if (newLocale) {
      this.setLocaleConfiguration(newLocale);
    }
    let locale = this.getLocaleConfiguration();

    // If no input locale is found check browser locale
    if (!locale) {
      locale = navigator.language;
    }

      // Find locale representation set the to parent menu object
      const languages = this.getMenuItems().find(eachItem => eachItem['menuId'] === 'language');

      // Check if current language exists
      let childLanguageMenu = languages['children'].find(childLanguage => childLanguage.menuId ===  locale);
      // If it does not exist set default language to English
      if (!childLanguageMenu) {
        childLanguageMenu = languages['children'][0];
      }

      // Set language of the translate service and arrange language menu representation
      this.translateService.use(childLanguageMenu.menuId).subscribe(() => {
        languages['icon'] = childLanguageMenu.icon;
      });
  }
}
