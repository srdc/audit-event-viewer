import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

export class OnauthMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): any {
    if (!environment.production) {
      console.log('Missing Translation: ' + params.key);
    }
    return params.key;
  }
}
