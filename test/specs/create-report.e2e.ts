import dayjs from "dayjs";
import LoginPage from "../page-objects/login.page";
import path from "path";

function getStartDateAndExpiredDate(monthsToAdd = 1, format = "MM-DD-YYYY") {
  const today = dayjs();
  const nextMonth = today.add(monthsToAdd, "month");

  return {
    startDate: today.format(format),
    expiredDate: nextMonth.format(format),
  };
}

async function checkSuccessMessage(
  expectedMessage = "Create report successfully"
) {
  const successMessage = $(".toast[role='alert'][aria-live='assertive']");
  await successMessage.waitForDisplayed({ timeout: 5000 });
  const messageText = await successMessage.getText();
  expect(messageText).toContain(expectedMessage);
}

describe("Create Report Tests", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("bepotod505@inikale.com", "123123@");
  });

  beforeEach(async () => {
    await browser.url("https://admin.onhandbi.com/#/report/new");
    await browser.refresh();
  });

  // Validation Tests
  it("should show error for missing required fields", async () => {
    const createButton = $(
      "//button[@type='submit' and contains(text(), 'Create')]"
    );
    await createButton.click();

    const isTitleErrorDisplayed = await $(
      "#report-title + .form-validate-error"
    ).isDisplayed();
    expect(isTitleErrorDisplayed).toBe(true);

    const isStartDateErrorDisplayed = await $(
      "#startedDate + .form-validate-error"
    ).isDisplayed();
    expect(isStartDateErrorDisplayed).toBe(true);

    const isExpiredDateErrorDisplayed = await $(
      "#expiredDate + .form-validate-error"
    ).isDisplayed();
    expect(isExpiredDateErrorDisplayed).toBe(true);

    const isReportMethodErrorDisplayed = await $(
      "#file-input + .form-validate-error"
    ).isDisplayed();
    expect(isReportMethodErrorDisplayed).toBe(true);
  });

  // Main Functional Tests
  it("should allow entering a title", async () => {
    const titleInput = $("#report-title");
    await titleInput.setValue("Test Report");

    const titleValue = await titleInput.getValue();
    expect(titleValue).toBe("Test Report");
  });

  it("should select a workspace", async () => {
    const workspaceSelect = $("#workspaceId");
    await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");

    const selectedValue = await workspaceSelect.getValue();
    expect(selectedValue).toBe("1");
  });

  it("should allow enabling/disabling Navigation Bar and Filter Pane", async () => {
    const navBarOption = $("#navbar");
    const filterPaneOption = $("#filterPane");

    await navBarOption.click();
    await filterPaneOption.click();

    const isNavBarSelected = await navBarOption.isSelected();
    const isFilterPaneSelected = await filterPaneOption.isSelected();

    expect(isNavBarSelected).toBe(false);
    expect(isFilterPaneSelected).toBe(true);
  });

  it("should navigate to reports page on cancel", async () => {
    const titleInput = $("#report-title");
    await titleInput.setValue("Test Report");

    const cancelButton = $(
      "//button[@type='submit' and contains(text(), 'Cancel')]"
    );
    await cancelButton.click();

    await browser.waitUntil(
      async () =>
        (await browser.getUrl()) ===
        "https://admin.onhandbi.com/#/user/reports",
      {
        timeout: 2000,
        timeoutMsg:
          "Did not navigate to the reports page after clicking Cancel",
      }
    );

    const currentUrl = await browser.getUrl();

    expect(currentUrl).toBe("https://admin.onhandbi.com/#/user/reports");
  });

  it("should create report via PBIX file upload", async () => {
    const titleInput = $("#report-title");
    await titleInput.setValue("Report via PBIX");

    const workspaceSelect = $("#workspaceId");
    await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");

    const startDateInput = $("#startedDate");
    const expiredDateInput = $("#expiredDate");

    const { startDate, expiredDate } = getStartDateAndExpiredDate();
    await startDateInput.setValue(startDate);
    await expiredDateInput.setValue(expiredDate);

    const navBarOption = $("#navbar");
    const filterPaneOption = $("#filterPane");

    await navBarOption.click();
    await filterPaneOption.click();

    const uploadOption = $("#upload-0");
    await uploadOption.click();

    const fileInput = $("#file-input");
    const filePath = path.resolve(__dirname, "test_report.pbix");
    await fileInput.addValue(filePath);

    await browser.pause(15000);

    const createButton = $(
      "//button[@type='submit' and contains(text(), 'Create')]"
    );
    await createButton.click();

    await checkSuccessMessage();
  });

  it("should create report via Report ID input", async () => {
    const titleInput = $("#report-title");
    await titleInput.setValue("Report via ID");

    const workspaceSelect = $("#workspaceId");
    await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");

    const startDateInput = $("#startedDate");
    const expiredDateInput = $("#expiredDate");
    const { startDate, expiredDate } = getStartDateAndExpiredDate();
    await startDateInput.setValue(startDate);
    await expiredDateInput.setValue(expiredDate);

    const navBarOption = $("#navbar");
    const filterPaneOption = $("#filterPane");

    await navBarOption.click();
    await filterPaneOption.click();

    const reportIdOption = $("#upload-1");
    await reportIdOption.click();

    const reportIdInput = $("#pbi");
    await reportIdInput.setValue("15cf8d8d-778a-4529-b9b9-ed510ab4c0cb");

    const createButton = $(
      "//button[@type='submit' and contains(text(), 'Create')]"
    );
    await createButton.click();

    await checkSuccessMessage();
  });
});
