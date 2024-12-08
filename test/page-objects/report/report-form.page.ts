import path from "path";

class ReportFormPage {
  /* ===  FORM INPUTS  === */
  get titleInput() {
    return $("[data-e2e='report-title-input']");
  }
  get startDateInput() {
    return $("[data-e2e='start-date-input']");
  }
  get endDateInput() {
    return $("[data-e2e='end-date-input']");
  }
  get workspaceInput() {
    return $("[data-e2e='workspace-input']");
  }
  get powerbiFileInput() {
    return $("[data-e2e='powerbi-file-input']");
  }
  get advanceOptionsInput() {
    return $$("[data-e2e^='advance-option-']");
  }
  get uploadFileRadioInput() {
    return $("[data-e2e='report-method-radio-0-input']");
  }
  get reportIdRadioInput() {
    return $("[data-e2e='report-method-radio-1-input']");
  }
  get reportIdInput() {
    return $("[data-e2e='report-id-input']");
  }
  /* === ERROR MESSAGES === */
  get titleError() {
    return $("[data-e2e='report-title-error']");
  }
  get startDateError() {
    return $("[data-e2e='start-date-error']");
  }
  get endDateError() {
    return $("[data-e2e='end-date-error']");
  }
  get powerbiError() {
    return $("[data-e2e='powerbi-file-error']");
  }

  /* ===  FORM ACTIONS  === */
  get cancelButton() {
    return $("[data-e2e='cancel-button']");
  }
  get submitButton() {
    return $("[data-e2e='submit-report-button']");
  }

  /* ===  ACTION METHODS === */
  async setTitle(value: string) {
    await this.titleInput.waitForDisplayed();
    await this.titleInput.setValue(value);
  }
  async setStartDate(value: string) {
    await this.startDateInput.waitForDisplayed();
    await this.startDateInput.setValue(value);
  }
  async setEndDate(value: string) {
    await this.endDateInput.waitForDisplayed();
    await this.endDateInput.setValue(value);
  }
  async setWorkspace(value: string) {
    await this.workspaceInput.waitForDisplayed();
    await this.workspaceInput.selectByAttribute("value", value);
  }
  async setPowerBIFile(filePath: string) {
    await this.powerbiFileInput.waitForExist();
    const absolutePath = path.resolve(filePath);
    const remoteFilePath = await browser.uploadFile(absolutePath);
    await this.powerbiFileInput.addValue(remoteFilePath);
  }
  async setReportId(reportId: string) {
    await this.reportIdInput.waitForDisplayed();
    await this.reportIdInput.setValue(reportId);
  }

  async getTitle() {
    await this.titleInput.waitForDisplayed();
    return await this.titleInput.getValue();
  }
  async getWorkspace() {
    await this.workspaceInput.waitForDisplayed();
    return await this.workspaceInput.getValue();
  }
  async getAdvanceOption(value: string) {
    return $(`[data-e2e='advance-option-${value}-input']`);
  }

  async fillReportForm({
    title,
    workspace,
    startDate,
    endDate,
    reportMethod,
    advanceOptions,
  }: {
    title: string;
    workspace: "1";
    startDate: string;
    endDate: string;
    reportMethod:
      | { type: "upload"; filePath: string }
      | { type: "reportId"; reportId: string };
    advanceOptions?: ("filterPane" | "navbar")[];
  }) {
    await this.setTitle(title);
    await this.setWorkspace(workspace);
    await this.startDateInput.setValue(startDate);
    await this.endDateInput.setValue(endDate);

    if (reportMethod.type === "upload") {
      await this.uploadFileRadioInput.waitForDisplayed();
      if (!(await this.uploadFileRadioInput.isSelected())) {
        await this.uploadFileRadioInput.click();
      }
      const { filePath } = reportMethod;
      await this.uploadAndVerifyFile({ filePath });
    } else {
      await this.reportIdRadioInput.waitForDisplayed();
      if (!(await this.reportIdRadioInput.isSelected())) {
        await this.reportIdRadioInput.click();
      }
      const { reportId } = reportMethod;
      await this.setReportId(reportId);
    }

    if (advanceOptions && advanceOptions.length > 0) {
      for (const option of advanceOptions) {
        const optionElement = await this.getAdvanceOption(option);
        if (!(await optionElement.isSelected())) {
          await optionElement.click();
        }
      }
    }
  }
  async uploadAndVerifyFile({ filePath }: { filePath: string }) {
    await this.uploadFileRadioInput.click();
    const isChecked = await this.uploadFileRadioInput.isSelected();
    expect(isChecked).toBe(true);

    const apiEndpoint = `https://report-obis.bagiit.vn/report/upload_import_file`;

    browser.setupInterceptor();

    await this.setPowerBIFile(filePath);

    const requests = await browser.getRequests();
    const uploadRequest = requests.find((req) => req.url === apiEndpoint);

    expect(uploadRequest).toBeDefined();
    expect(uploadRequest!.response.statusCode).toBe(200);
  }
  async embedReportAndVerify({
    reportId,
    workspaceId,
  }: {
    reportId: string;
    workspaceId: string;
  }) {
    await this.reportIdRadioInput.click();
    const isChecked = await this.reportIdRadioInput.isSelected();
    expect(isChecked).toBe(true);

    const apiEndpoint = `https://report-obis.bagiit.vn/report/getembedinfo?reportId=${reportId}&workspaceId=${workspaceId}`;

    browser.setupInterceptor();

    const requests = await browser.getRequests();
    const embedRequest = requests.find((req) => req.url === apiEndpoint);

    expect(embedRequest).toBeDefined();
    expect(embedRequest!.response.statusCode).toBe(200);
  }
  async clickSubmitButton() {
    await this.submitButton.scrollIntoView();
    await this.submitButton.moveTo();
    await this.submitButton.click();
  }
  async checkRequiredFieldErrors() {
    const titleErrorText = await this.titleError.getText();
    expect(titleErrorText).toBe("Please enter title");

    const startDateText = await this.startDateError.getText();
    expect(startDateText).toBe("Please choose start date");

    const endDateText = await this.endDateError.getText();
    expect(endDateText).toBe("Please choose expired date");

    const powerbiText = await this.powerbiError.getText();
    expect(powerbiText).toBe("Please enter report ID");
  }
  async checkErrorMessage({
    element,
    expectedMessage,
  }: {
    element: ChainablePromiseElement;
    expectedMessage: string;
  }) {
    await element.waitForDisplayed();
    const actualMessage = await element.getText();
    expect(actualMessage).toBe(expectedMessage);
  }
}

export default new ReportFormPage();
