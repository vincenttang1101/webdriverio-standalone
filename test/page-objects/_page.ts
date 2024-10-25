import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path: string) {
    return browser.url(`https://the-internet.herokuapp.com/${path}`);
  }

  public OHBIOpen() {
    return browser.url(
      `https://sso.onhandbi.com/realms/ohbi_tenant/protocol/openid-connect/auth?client_id=account&redirect_uri=https%3A%2F%2Fsso.onhandbi.com%2Frealms%2Fohbi_tenant%2Faccount%2Flogin-redirect&state=0%2F813e7376-796d-4a16-b907-6f50aae48daf&response_type=code&scope=openid`
    );
  }
}
