import LoginPage from "../page-objects/login.page";

describe("Login Tests", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it("should fail to login with invalid credentials", async () => {
    await LoginPage.login("invalid_user@gmail.com", "invalid_password");

    const errorAlert = $(".alert.alert-error");

    await errorAlert.waitForDisplayed({ timeout: 2000 });

    const errorMessage = await errorAlert.getText();
    expect(errorMessage).toContain("Invalid username or password");
  });

  it("should login successfully with valid credentials", async () => {
    await LoginPage.login("cikipec787@aqqor.com", "123123@");

    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl.includes("admin.onhandbi.com");
    });

    await browser.waitUntil(async () => {
      const idToken = await browser.execute(() =>
        localStorage.getItem("_id_tk_landing_")
      );
      const refreshToken = await browser.execute(() =>
        localStorage.getItem("_rf_tk_landing_")
      );
      const accessToken = await browser.execute(() =>
        localStorage.getItem("_tk_landing_")
      );
      return idToken !== null && refreshToken !== null && accessToken !== null;
    });

    const idToken = await browser.execute(() =>
      localStorage.getItem("_id_tk_landing_")
    );
    const refreshToken = await browser.execute(() =>
      localStorage.getItem("_rf_tk_landing_")
    );
    const accessToken = await browser.execute(() =>
      localStorage.getItem("_tk_landing_")
    );

    expect(idToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();
    expect(accessToken).not.toBeNull();
  });
});
