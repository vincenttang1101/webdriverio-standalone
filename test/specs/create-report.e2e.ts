import LoginPage from "../page-objects/login.page";
import path from "path";

describe("Create Report Tests", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("cikipec787@aqqor.com", "123123@");
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
        timeout: 5000,
        timeoutMsg: "Không điều hướng đến trang báo cáo sau khi nhấn Cancel",
      }
    );

    const currentUrl = await browser.getUrl();

    expect(currentUrl).toBe("https://admin.onhandbi.com/#/user/reports");
  });

  it("should create report via PBIX file upload", async () => {
    const titleInput = $("#report-title");
    await titleInput.setValue("PBIX Report");

    const workspaceSelect = $("#workspaceId");
    await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");

    const startDateInput = $("#startedDate");
    const expiredDateInput = $("#expiredDate");
    await startDateInput.setValue("11-23-2024");
    await expiredDateInput.setValue("12-24-2024");

    const uploadOption = $("#upload-0");
    await uploadOption.click();

    const fileInput = $("#file-input");
    const filePath = path.resolve(__dirname, "test_report.pbix");
    await fileInput.addValue(filePath);

    const navBarOption = $("#navbar");
    const filterPaneOption = $("#filterPane");

    await navBarOption.click();
    await filterPaneOption.click();

    await browser.pause(15000);
    const createButton = $(
      "//button[@type='submit' and contains(text(), 'Create')]"
    );
    await createButton.click();

    const successMessage = $(".toast.bg-success.show.showing");
    await successMessage.waitForDisplayed();
    const isToastDisplayed = await successMessage.isDisplayed();
    expect(isToastDisplayed).toBe(true);
  });
});
