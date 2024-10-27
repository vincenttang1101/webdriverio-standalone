import { $ } from "@wdio/globals";
import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get inputEmail() {
    return $("#email");
  }

  public get inputPassword() {
    return $("#password");
  }

  public get btnSubmit() {
    return $('input[type="submit"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  public async login(email: string, password: string) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
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
}

export default new LoginPage();
