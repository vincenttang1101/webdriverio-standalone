class ReportFormPage {
  get titleInput() {
    return $("[data-e2e='report-title-input']");
  }

  get startDateInput() {
    return $("[data-e2e='start-date-input']");
  }

  get endDateInput() {
    return $("[data-e2e='end-date-input']");
  }

  get powerbiFileInput() {
    return $("[data-e2e='powerbi-file-input']");
  }

  /* Error */
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
    expect(isStartDateErrorDisplayed).toBe(true);

    const isEndDateErrorDisplayed = await this.endDateError.isDisplayed();
    expect(isEndDateErrorDisplayed).toBe(true);

    const isReportMethodErrorDisplayed = await this.powerbiError.isDisplayed();
    expect(isReportMethodErrorDisplayed).toBe(true);
  }

  async validateDateRange() {
    const startDate = await this.startDateInput.getValue();
    const endDate = await this.endDateInput.getValue();

    if (new Date(startDate) > new Date(endDate)) {
      // Show Date Validation Error
      await this.dateValidationError.waitForDisplayed();
    }
  }
}

export default new ReportFormPage();
