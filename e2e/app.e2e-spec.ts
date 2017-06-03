import { MsV4Page } from './app.po';

describe('ms-v4 App', () => {
  let page: MsV4Page;

  beforeEach(() => {
    page = new MsV4Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
