import LoginPage from "../page-objects/login.page";

describe("Share Report Test", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("tangtrinhquang@gmail.com", "123123@");
  });

  it("should set share status to 'Restricted'", async () => {
    await browser.url("https://admin.onhandbi.com/#/reports");
    await browser.pause(2000);

    const latestReportRow = $("table.table-hover tbody tr:first-child");

    const optionsButton = latestReportRow.$(
      "button.Dropdown_button-secondary__-1SjD"
    );
    await optionsButton.click();

    const shareOption = latestReportRow.$("//*[contains(text(), 'Share')]");
    await shareOption.moveTo();

    const restrictedOption = $("div.Submenu_submenu__RtC6b ul li:first-child");
    await restrictedOption.click();

    await browser.pause(1000);

    const sharedStatus = await latestReportRow
      .$("td:nth-child(3) .badge")
      .getText();
    expect(sharedStatus).toBe("Restricted");
  });

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
