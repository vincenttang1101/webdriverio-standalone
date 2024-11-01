import LoginPage from "../page-objects/login.page";
import path from "path";

describe("Create Report Tests", () => {
  it("should allow entering a title", async () => {
    await LoginPage.open();

    await LoginPage.login("cikipec787@aqqor.com", "123123@");

    await browser.url("https://admin.onhandbi.com/#/report/new");

    const titleInput = $("#report-title");
    await titleInput.setValue("Monthly Sales Report");
    const titleValue = await titleInput.getValue();

    expect(titleValue).toBe("Monthly Sales Report");
  });

  it("should select a workspace", async () => {
    const workspaceSelect = $("#workspaceId");
    await workspaceSelect.selectByVisibleText("OHBI Premium - OHBI");
    const selectedValue = await workspaceSelect.getValue();
    expect(selectedValue).toBe("1");
  });

  it("should allow selecting start and expired dates", async () => {
    const startDateInput = $("#startedDate");
    const expiredDateInput = $("#expiredDate");

    await startDateInput.setValue("11-23-2024");
    await expiredDateInput.setValue("12-24-2024");

    const startDateValue = await startDateInput.getValue();
    const expiredDateValue = await expiredDateInput.getValue();

    expect(startDateValue).toBe("2024-11-23");
    expect(expiredDateValue).toBe("2024-12-24");
  });

  it("should allow choosing a file", async () => {
    const fileInput = $("#file-input");

    const filePath = path.resolve(
      __dirname,
      "sales_returns_sample_v201912.pbix"
    );

    console.log("filePath", filePath);
    await fileInput.addValue(filePath);

    await browser.pause(15000);

    const uploadedFileName = await fileInput.getValue();
    console.log("Uploaded file name:", uploadedFileName);
    expect(uploadedFileName).toContain("file.pbix");
  });
});
