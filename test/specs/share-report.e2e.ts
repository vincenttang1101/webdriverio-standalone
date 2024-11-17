import LoginPage from "../page-objects/login.page";
import { logout } from "../utils/auth.util";

describe("Share Report Test", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("bepotod505@inikale.com", "123123@");
  });

  it("should allow only specified users to access the report", async () => {
    await browser.url("https://admin.onhandbi.com/#/reports");
    await browser.pause(2000);

    const reportRow = $(
      "//table[contains(@class, 'table-hover')]//tbody//tr[td/a[contains(text(), 'Report via PBIX')]]"
    );

    await expect(reportRow).toBeExisting();

    const optionsButton = reportRow.$(
      "button.Dropdown_button-secondary__-1SjD"
    );
    await optionsButton.waitForClickable({ timeout: 2000 });
    await optionsButton.click();

    const shareOption = reportRow.$("//*[contains(text(), 'Share')]");
    await shareOption.moveTo();

    const restrictedOption = $("div.Submenu_submenu__RtC6b ul li:first-child");
    await restrictedOption.click();

    const sharedUsersModal = $("div.modal-content");
    await expect(sharedUsersModal).toBeDisplayed();

    const generalAccessSelect = sharedUsersModal.$("select.form-select");
    await generalAccessSelect.selectByVisibleText("Restricted");

    const selectedOption = await generalAccessSelect.getValue();
    expect(selectedOption).toBe("0");

    const emailInput = sharedUsersModal.$("input#exampleDropdownFormEmail1");
    await emailInput.setValue("cikipec787@aqqor.com");

    await browser.keys("Enter");

    const sendButton = $("button=Send");
    await sendButton.click();

    const closeModalButton = $(".modal-footer button.btn.btn-secondary");
    await closeModalButton.click();

    await optionsButton.click();
    const copyLinkOption = $("//*[contains(text(), 'Copy link')]");
    await copyLinkOption.click();

    const copiedLink = await browser.execute(() =>
      navigator.clipboard.readText()
    );

    await logout();

    await LoginPage.open();
    await LoginPage.login("cikipec787@aqqor.com", "123123@");

    await browser.url(copiedLink);
    await browser.pause(8000);

    const currentUrl = (await browser.getUrl()) + "?tenant=ohbi_tenant";
    expect(currentUrl).toBe(copiedLink);
  });

  it("should allow only the owner to access the report", async () => {
    await browser.pause(1000);
    await logout();
    await LoginPage.open();
    await LoginPage.login("bepotod505@inikale.com", "123123@");

    await browser.url("https://admin.onhandbi.com/#/reports");
    await browser.pause(2000);

    const reportRow = $(
      "//table[contains(@class, 'table-hover')]//tbody//tr[td/a[contains(text(), 'Report via PBIX')]]"
    );
    await expect(reportRow).toBeExisting();

    const optionsButton = reportRow.$(
      "button.Dropdown_button-secondary__-1SjD"
    );
    await optionsButton.waitForClickable({ timeout: 2000 });
    await optionsButton.click();

    const shareOption = reportRow.$("//*[contains(text(), 'Share')]");
    await shareOption.click();

    const anyoneWithLinkOption = $("//*[text()='Anyone with the link']");
    await anyoneWithLinkOption.moveTo();

    const onOption = $("//*[text()='On']");
    await onOption.click();

    await shareOption.click();

    const onlyMeOption = $("//*[contains(text(), 'Only me')]");
    await onlyMeOption.click();

    const copyLinkOption = $("//*[contains(text(), 'Copy link')]");
    await copyLinkOption.click();

    const copiedLink = await browser.execute(() =>
      navigator.clipboard.readText()
    );

    await browser.url(copiedLink);

    await browser.pause(8000);

    const currentUrl = (await browser.getUrl()) + "?tenant=ohbi_tenant";
    expect(currentUrl).toBe(copiedLink);
  });

  // it("should set share status to 'Restricted'", async () => {
  //   await browser.url("https://admin.onhandbi.com/#/reports");
  //   await browser.pause(2000);

  //   const latestReportRow = $("table.table-hover tbody tr:first-child");

  //   const optionsButton = latestReportRow.$(
  //     "button.Dropdown_button-secondary__-1SjD"
  //   );
  //   await optionsButton.click();

  //   const shareOption = latestReportRow.$("//*[contains(text(), 'Share')]");
  //   await shareOption.moveTo();

  //   const restrictedOption = $("div.Submenu_submenu__RtC6b ul li:first-child");
  //   await restrictedOption.click();

  //   const sharedUsersModal = $("div.modal-content");
  //   await expect(sharedUsersModal).toBeDisplayed();

  //   const generalAccessSelect = sharedUsersModal.$("select.form-select");
  //   await generalAccessSelect.selectByVisibleText("Restricted");

  //   const selectedOption = await generalAccessSelect.getValue();
  //   expect(selectedOption).toBe("0");

  //   const emailInput = sharedUsersModal.$("input#exampleDropdownFormEmail1");
  //   await emailInput.setValue("test1@example.com");

  //   await browser.keys("Enter");

  //   const sendButton = sharedUsersModal.$("button=Send");
  //   await sendButton.click();

  //   await browser.pause(3000);

  //   const sharedStatus = await latestReportRow
  //     .$("td:nth-child(3) .badge")
  //     .getText();
  //   expect(sharedStatus).toBe("Restricted");
  // });

  //   it("should share the latest report with 'Anyone with the link'", async () => {
  //     await browser.url("https://admin.onhandbi.com/#/reports");
  //     await browser.pause(2000);
  //     const latestReportRow = $("table.table-hover tbody tr:first-child");

  //     const optionsButton = latestReportRow.$(
  //       "button.Dropdown_button-secondary__-1SjD"
  //     );
  //     await optionsButton.click();

  //     const shareOption = $("(//li[contains(@class, 'Item_item__azkIp')])[1]");
  //     await shareOption.moveTo();

  //     const anyoneWithLinkOption = $("//*[text()='Anyone with the link']");
  //     await anyoneWithLinkOption.moveTo();

  //     const onOption = $("//*[text()='On']");
  //     await onOption.click();

  //     await browser.pause(1000);

  //     const sharedStatus = await latestReportRow
  //       .$("td:nth-child(3) .badge")
  //       .getText();

  //     expect(sharedStatus).toBe("Anyone");
  //   });
});
