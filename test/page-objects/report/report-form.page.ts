import dayjs from "dayjs";

class ReportFormPage {
  /* Getter */
  get titleInput() {
    return $("[data-e2e='report-title-input']");
  }

  get startDateInput() {
    return $("[data-e2e='start-date-input']");
  }
  get startDateValue() {
    this.startDateInput.waitForDisplayed();
    return this.startDateInput.getValue();
  }

  get endDateInput() {
    return $("[data-e2e='end-date-input']");
  }

  get powerbiFileInput() {
    return $("[data-e2e='powerbi-file-input']");
  }

  get titleError() {
    return $("[data-e2e='report-title-input'] + .form-validate-error");
  }

  get startDateError() {
    return $("[data-e2e='start-date-validation-error']");
  }

  get endDateError() {
    return $("[data-e2e='end-date-validation-error']");
  }

  get powerbiError() {
    return $("[data-e2e='powerbi-file-input'] + .form-validate-error");
  }

  get submitButton() {
    return $("[data-e2e='submit-report-button']");
  }

  /* Setter */
  set startDate(value: string) {
    this.startDateInput.waitForDisplayed();
    this.startDateInput.setValue(value);
  }

  set endDate(value: string) {
    this.endDateInput.waitForDisplayed();
    this.endDateInput.setValue(value);
  }

  /* Method */
  async fillReportForm({
    title,
    startDate,
    endDate,
  }: {
    title: string;
    startDate: string;
    endDate: string;
  }) {
    await this.titleInput.setValue(title);
    await this.startDateInput.setValue(startDate);
    await this.endDateInput.setValue(endDate);
  }

  async submitReport() {
    await this.submitButton.click();
  }

  async checkForErrors() {
    const isTitleErrorDisplayed = await this.titleError.isDisplayed();
    expect(isTitleErrorDisplayed).toBe(true);

    const isStartDateErrorDisplayed = await this.startDateError.isDisplayed();
    console.log("startDateError 2", await this.startDateError.getValue());
    expect(isStartDateErrorDisplayed).toBe(true);

    const isEndDateErrorDisplayed = await this.endDateError.isDisplayed();
    expect(isEndDateErrorDisplayed).toBe(true);

    const isReportMethodErrorDisplayed = await this.powerbiError.isDisplayed();
    expect(isReportMethodErrorDisplayed).toBe(true);
  }

  async validateDateRange({
    startDate,
    endDate,
    expectedStartDateError,
    expectedEndDateError,
  }: {
    startDate: string;
    endDate: string;
    expectedStartDateError?: string;
    expectedEndDateError?: string;
  }) {
    this.startDate = startDate;
    this.endDate = endDate;
    // Lấy currentDate và chuyển đổi sang MM-DD-YYYY
    const currentDate = dayjs().format("MM-DD-YYYY");

    // Chuyển đổi startDate và endDate sang đối tượng dayjs
    const startDateObj = dayjs(startDate, "MM-DD-YYYY");
    const endDateObj = dayjs(endDate, "MM-DD-YYYY");
    const currentDateObj = dayjs(currentDate, "MM-DD-YYYY");

    console.log("startDateError", await this.startDateError.getValue());
    // if (startDateObj.isAfter(endDateObj)) {
    //   const startDateErrorText = await this.startDateError.getText();
    //   expect(startDateErrorText).toBe(
    //     expectedStartDateError || "Start date must be before expired date"
    //   );
    // } else if (endDateObj.isBefore(startDateObj)) {
    //   const endDateErrorText = await this.endDateError.getText();
    //   expect(endDateErrorText).toBe(
    //     expectedEndDateError || "Expired date must be after start date"
    //   );
    // } else if (startDateObj.isBefore(currentDateObj)) {
    //   const startDateErrorText = await this.startDateError.getText();
    //   expect(startDateErrorText).toBe(
    //     expectedStartDateError || "Please choose future date"
    //   );
    // } else if (endDateObj.isBefore(currentDateObj)) {
    //   const endDateErrorText = await this.endDateError.getText();
    //   expect(endDateErrorText).toBe(
    //     expectedEndDateError || "Please choose future date"
    //   );
    // }
  }
}

export default new ReportFormPage();
