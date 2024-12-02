import dayjs from "dayjs";
import LoginPage from "../page-objects/login.page";
import { USERS } from "../constants/user.constant";
import ReportFormPage from "../page-objects/report/report-form.page";
import { getFormattedDate } from "../utils/date.util";

describe("Create Report Tests", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(USERS["vikiw32730@cantozil.com"]);
  });

  beforeEach(async () => {
    await browser.url(`${process.env.ADMIN_OHBI_HOST}/report/new`);
    await browser.refresh();
  });

  /**
   * 1. Validation Tests
   */
  describe("Validation Tests", () => {
    it("should show error for required fields", async () => {
      await ReportFormPage.clickSubmitButton();
      await ReportFormPage.checkRequiredFieldErrors();
    });

    it("should show error for invalid date fields", async () => {
      // Calculate dynamic dates in MM-DD-YYYY format
      const today = getFormattedDate(); // Current date
      const pastDate = getFormattedDate({ offsetDays: -5 }); // 5 days in the past
      const futureDate = getFormattedDate({ offsetDays: 10 }); // 10 days in the future
      const anotherFutureDate = getFormattedDate({ offsetDays: 15 }); // 15 days in the future

      // Case 1: Start Date in the past
      await ReportFormPage.setStartDate(pastDate);
      await ReportFormPage.clickSubmitButton();
      await ReportFormPage.checkErrorMessage({
        element: ReportFormPage.startDateError,
        expectedMessage: "Please choose future date",
      });

      // Case 2: End Date in the past
      // await ReportFormPage.startDateInput.clearValue();
      // await ReportFormPage.setEndDate(pastDate);
      // await ReportFormPage.clickSubmitButton();
      // await ReportFormPage.checkErrorMessage({
      //   element: ReportFormPage.endDateError,
      //   expectedMessage: "Please choose future date",
      // });

      // // Case 3: Start Date is after End Date
      await ReportFormPage.setStartDate(anotherFutureDate);
      await ReportFormPage.setEndDate(futureDate);
      await ReportFormPage.clickSubmitButton();
      await ReportFormPage.checkErrorMessage({
        element: ReportFormPage.startDateError,
        expectedMessage: "Start date needs to be before expired date",
      });

      // Case 4: End Date is before Start Date
      await ReportFormPage.setStartDate(futureDate);
      await ReportFormPage.setEndDate(today);
      await ReportFormPage.submitReport();
      await ReportFormPage.checkErrorMessage({
        element: ReportFormPage.endDateError,
        expectedMessage: "Expired date needs to be after start date",
      });
    });
  });

  /**
   * 2. Functional Tests
   */
  describe("Functional Tests", () => {
    it("should allow entering a title", async () => {
      await ReportFormPage.setTitle("Test Report");
      const titleVal = await ReportFormPage.getTitle();
      expect(titleVal).toBe("Test Report");
    });

    it("should allow selecting a workspace", async () => {
      await ReportFormPage.setWorkspace("1");
      const workspaceVal = await ReportFormPage.getWorkspace();
      expect(workspaceVal).toBe("1");
    });

    it("should allow interacting with advance options", async () => {
      const checkboxes = await ReportFormPage.advanceOptions;

      for (const checkbox of checkboxes) {
        const value = await checkbox.getAttribute("value");
        const isChecked = await checkbox.isSelected();

        if (value === "navbar") {
          expect(isChecked).toBe(true);
        } else {
          expect(isChecked).toBe(false);
        }
      }

      for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isSelected();

        if (!isChecked) {
          await checkbox.click();
          expect(await checkbox.isSelected()).toBe(true);
        } else {
          await checkbox.click();
          expect(await checkbox.isSelected()).toBe(false);
        }
      }
    });
  });

  // it("should select a workspace", async () => {
  //   const workspaceSelect = $("#workspaceId");
  //   await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");

  //   const selectedValue = await workspaceSelect.getValue();
  //   expect(selectedValue).toBe("1");
  // });

  // it("should allow enabling/disabling Navigation Bar and Filter Pane", async () => {
  //   const navBarOption = $("#navbar");
  //   const filterPaneOption = $("#filterPane");

  //   await navBarOption.click();
  //   await filterPaneOption.click();

  //   const isNavBarSelected = await navBarOption.isSelected();
  //   const isFilterPaneSelected = await filterPaneOption.isSelected();

  //   expect(isNavBarSelected).toBe(false);
  //   expect(isFilterPaneSelected).toBe(true);
  // });

  // it("should navigate to reports page on cancel", async () => {
  //   const titleInput = $("#report-title");
  //   await titleInput.setValue("Test Report");

  //   const cancelButton = $(
  //     "//button[@type='submit' and contains(text(), 'Cancel')]"
  //   );
  //   await cancelButton.click();

  //   await browser.waitUntil(
  //     async () =>
  //       (await browser.getUrl()) ===
  //       "https://admin.onhandbi.com/#/user/reports",
  //     {
  //       timeout: 2000,
  //       timeoutMsg:
  //         "Did not navigate to the reports page after clicking Cancel",
  //     }
  //   );

  //   const currentUrl = await browser.getUrl();

  //   expect(currentUrl).toBe("https://admin.onhandbi.com/#/user/reports");
  // });

  // it("should create report via PBIX file upload", async () => {
  //   const titleInput = $("#report-title");
  //   await titleInput.setValue("Report via PBIX");

  //   const workspaceSelect = $("#workspaceId");
  //   await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");

  //   const startDateInput = $("#startedDate");
  //   const expiredDateInput = $("#expiredDate");

  //   const { startDate, expiredDate } = getStartDateAndExpiredDate();
  //   await startDateInput.setValue(startDate);
  //   await expiredDateInput.setValue(expiredDate);

  //   const navBarOption = $("#navbar");
  //   const filterPaneOption = $("#filterPane");

  //   await navBarOption.click();
  //   await filterPaneOption.click();

  //   const uploadOption = $("#upload-0");
  //   await uploadOption.click();

  //   const fileInput = $("#file-input");
  //   const filePath = path.resolve(__dirname, "test_report.pbix");
  //   await fileInput.addValue(filePath);

  //   await browser.pause(15000);

  //   const createButton = $(
  //     "//button[@type='submit' and contains(text(), 'Create')]"
  //   );
  //   await createButton.click();

  //   await checkSuccessMessage();
  // });

  // it("should create report via Report ID input", async () => {
  //   const titleInput = $("#report-title");
  //   await titleInput.setValue("Report via ID");

  //   const workspaceSelect = $("#workspaceId");
  //   await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");

  //   const startDateInput = $("#startedDate");
  //   const expiredDateInput = $("#expiredDate");
  //   const { startDate, expiredDate } = getStartDateAndExpiredDate();
  //   await startDateInput.setValue(startDate);
  //   await expiredDateInput.setValue(expiredDate);

  //   const navBarOption = $("#navbar");
  //   const filterPaneOption = $("#filterPane");

  //   await navBarOption.click();
  //   await filterPaneOption.click();

  //   const reportIdOption = $("#upload-1");
  //   await reportIdOption.click();

  //   const reportIdInput = $("#pbi");
  //   await reportIdInput.setValue("15cf8d8d-778a-4529-b9b9-ed510ab4c0cb");

  //   const createButton = $(
  //     "//button[@type='submit' and contains(text(), 'Create')]"
  //   );
  //   await createButton.click();

  //   await checkSuccessMessage();
  // });
});
