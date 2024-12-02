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
  async getWorkspace() {
    await this.workspaceInput.waitForDisplayed();
    return await this.workspaceInput.getValue();
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

  // async validateDateRange({
  //   startDate,
  //   endDate,
  //   expectedStartDateError,
  //   expectedEndDateError,
  // }: {
  //   startDate: string;
  //   endDate: string;
  //   expectedStartDateError?: string;
  //   expectedEndDateError?: string;
  // }) {
  //   this.startDate = startDate;
  //   this.endDate = endDate;
  //   // Lấy currentDate và chuyển đổi sang MM-DD-YYYY
  //   const currentDate = dayjs().format("MM-DD-YYYY");

  //   // Chuyển đổi startDate và endDate sang đối tượng dayjs
  //   const startDateObj = dayjs(startDate, "MM-DD-YYYY");
  //   const endDateObj = dayjs(endDate, "MM-DD-YYYY");
  //   const currentDateObj = dayjs(currentDate, "MM-DD-YYYY");

  //   console.log("startDateError", await this.startDateError.getValue());
  //   // if (startDateObj.isAfter(endDateObj)) {
  //   //   const startDateErrorText = await this.startDateError.getText();
  //   //   expect(startDateErrorText).toBe(
  //   //     expectedStartDateError || "Start date must be before expired date"
  //   //   );
  //   // } else if (endDateObj.isBefore(startDateObj)) {
  //   //   const endDateErrorText = await this.endDateError.getText();
  //   //   expect(endDateErrorText).toBe(
  //   //     expectedEndDateError || "Expired date must be after start date"
  //   //   );
  //   // } else if (startDateObj.isBefore(currentDateObj)) {
  //   //   const startDateErrorText = await this.startDateError.getText();
  //   //   expect(startDateErrorText).toBe(
  //   //     expectedStartDateError || "Please choose future date"
  //   //   );
  //   // } else if (endDateObj.isBefore(currentDateObj)) {
  //   //   const endDateErrorText = await this.endDateError.getText();
  //   //   expect(endDateErrorText).toBe(
  //   //     expectedEndDateError || "Please choose future date"
  //   //   );
  //   // }
  // }
}

export default new ReportFormPage();
