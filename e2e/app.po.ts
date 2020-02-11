import { browser, element, by } from 'protractor';

export class Power2dmLoginproviderPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
