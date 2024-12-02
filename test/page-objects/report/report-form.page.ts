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
  get advanceOptions() {
    return $$("[data-e2e^='advance-option-']");
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

  async getTitle() {
    await this.titleInput.waitForDisplayed();
    return await this.titleInput.getValue();
  }
  async getWorkspace() {
    await this.workspaceInput.waitForDisplayed();
    return await this.workspaceInput.getValue();
  }
  async getAdvanceOption(value: string) {
    return $(`[data-e2e='advance-option-${value}']`);
  }

  async fillReportForm({
    title,
    workspace,
    startDate,
    endDate,
  }: {
    title: string;
    workspace: string;
    startDate: string;
    endDate: string;
  }) {
    await this.setTitle(title);
    await this.setWorkspace(workspace);
    await this.startDateInput.setValue(startDate);
    await this.endDateInput.setValue(endDate);
  }
  async submitReport() {
    await this.submitButton.click();
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
