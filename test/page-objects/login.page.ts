import { $ } from "@wdio/globals";

class LoginPage {
  get emailInput() {
    return $("#email");
  }

  get passwordInput() {
    return $("#password");
  }

  get submitButton() {
    return $('input[type="submit"]');
  }

  async open() {
    // return await browser.url(
    //   `https://keycloak.bagiit.vn/realms/ohbi_tenant/protocol/openid-connect/auth?client_id=security-admin-console-dev&redirect_uri=${process.env.ADMIN_OHBI_HOST}/&response_type=code&scope=openid`
    // );
    return await browser.url(
      "https://keycloak.bagiit.vn/realms/ohbi_tenant/protocol/openid-connect/auth?client_id=security-admin-console-dev&redirect_uri=http%3A%2F%2Flocalhost%3A3006%2F&state=976420d8-3b53-4e07-ae28-7e8c839688ab&response_mode=fragment&response_type=code&scope=openid&nonce=6d4ddb38-3396-4064-907b-354d61f5723f&code_challenge=sQhpLbJttITFqH5nrIlm5PKUWeB8s3DQdYp5XCoKvuo&code_challenge_method=S256"
    );
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
  }

  // public async openNewBrowser() {
  //   const newBrowser = await super.openNewBrowser("#/login");

  //   await newBrowser.waitUntil(
  //     async () => (await newBrowser.getUrl()).includes("sso.onhandbi.com"),
  //     {
  //       timeoutMsg:
  //         "Did not redirect to the SSO page within the specified time limit.",
  //     }
  //   );

  //   return newBrowser;
  // }

  // public async loginWithNewBrowser({
  //   email,
  //   password,
  //   browserInstance,
  // }: {
  //   email: string;
  //   password: string;
  //   browserInstance: WebdriverIO.Browser;
  // }) {
  //   const emailField = await browserInstance.$(await this.emailInput.selector);
  //   const passwordField = await browserInstance.$(
  //     await this.passwordInput.selector
  //   );
  //   const submitButton = await browserInstance.$(
  //     await this.submitButton.selector
  //   );

  //   await emailField.setValue(email);
  //   await passwordField.setValue(password);
  //   await submitButton.click();

  //   return browserInstance;
  // }
}

export default new LoginPage();
