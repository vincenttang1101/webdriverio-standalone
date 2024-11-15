import { remote } from "webdriverio";

export default class BrowserManager {
  private static newBrowser: WebdriverIO.Browser | null = null;

  public static async openNewBrowser(
    url: string
  ): Promise<WebdriverIO.Browser> {
    try {
      if (!this.newBrowser) {
        this.newBrowser = await remote({
          capabilities: {
            browserName: "chrome",
            "goog:chromeOptions": {
              args: ["--no-sandbox", "--disable-dev-shm-usage"],
            },
          },
        });
      }

      await this.newBrowser.url(url);
      return this.newBrowser;
    } catch (error) {
      console.error("Failed to open new browser session:", error);
      throw error;
    }
  }

  public static async closeNewBrowser(): Promise<void> {
    if (this.newBrowser) {
      await this.newBrowser.deleteSession();
      this.newBrowser = null;
    }
  }
}
