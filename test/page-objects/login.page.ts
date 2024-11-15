import { $ } from "@wdio/globals";
import Page from "./page";

class LoginPage extends Page {
  public get inputEmail() {
    return $("#email");
  }

  public get inputPassword() {
    return $("#password");
  }

  public get btnSubmit() {
    return $('input[type="submit"]');
  }

  public async login(email: string, password: string) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public async open() {
    try {
      await super.open("#/login");

      await browser.waitUntil(
        async () => (await browser.getUrl()).includes("sso.onhandbi.com"),
        {
          timeoutMsg:
            "Did not redirect to the SSO page within the specified time limit.",
        }
      );
    } catch (error) {
      console.log("Error Navigate:", error);
    }
  }

  public async openNewBrowser() {
    const newBrowser = await super.openNewBrowser("#/login");

    await newBrowser.waitUntil(
      async () => (await newBrowser.getUrl()).includes("sso.onhandbi.com"),
      {
        timeoutMsg:
          "Did not redirect to the SSO page within the specified time limit.",
      }
    );

    return newBrowser;
  }

  public async loginWithNewBrowser({
    email,
    password,
    browserInstance,
  }: {
    email: string;
    password: string;
    browserInstance: WebdriverIO.Browser;
  }) {
    const emailField = await browserInstance.$(await this.inputEmail.selector);
    const passwordField = await browserInstance.$(
      await this.inputPassword.selector
    );
    const submitButton = await browserInstance.$(await this.btnSubmit.selector);

    await emailField.setValue(email);
    await passwordField.setValue(password);
    await submitButton.click();

    return browserInstance;
  }
}

export default new LoginPage();
