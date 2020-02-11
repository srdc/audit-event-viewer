import { Power2dmLoginproviderPage } from './app.po';

describe('power2dm-loginprovider App', function() {
  let page: Power2dmLoginproviderPage;

  beforeEach(() => {
    page = new Power2dmLoginproviderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
