import LoginPage from "../page-objects/login.page";

describe("Login Tests", () => {
  it("should fail to login with invalid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("invalidUser", "invalidPassword");

    const errorAlert = $(".alert.alert-error");

    await errorAlert.waitForDisplayed({ timeout: 2000 });

    const errorMessage = await errorAlert.getText();
    expect(errorMessage).toContain("Invalid username or password");
  });

  it("should login successfully with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("cikipec787@aqqor.com", "123123@");

    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes("admin.onhandbi.com");
      },
      {
        timeout: 1000,
        interval: 500,
        timeoutMsg:
          "Không điều hướng đến domain admin.onhandbi.com trong thời gian quy định",
      }
    );

    const idToken = await browser.execute(() => {
      return localStorage.getItem("_id_tk_landing_");
    });

    const refreshToken = await browser.execute(() => {
      return localStorage.getItem("_rf_tk_landing_");
    });
    const accessToken = await browser.execute(() => {
      return localStorage.getItem("_tk_landing_");
    });

    expect(idToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();
    expect(accessToken).not.toBeNull();
  });
});
