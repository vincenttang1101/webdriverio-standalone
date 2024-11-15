import { browser } from "@wdio/globals";
import { remote } from "webdriverio";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  public async open(path: string) {
    return await browser.url(`https://admin.onhandbi.com/${path}`);
  }

  public async logout() {
    return await browser.deleteCookies();
  }

  public async openNewBrowser(path: string) {
    const newBrowser = await remote({
      capabilities: {
        browserName: "chrome",
        "goog:chromeOptions": {
          args: [],
        },
      },
    });

    await newBrowser.url(`https://admin.onhandbi.com/${path}`);
    return newBrowser;
  }
}
