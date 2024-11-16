const logout = async () => {
  const dropdownToggle = $(".header-nav.ms-3.me-4");
  await dropdownToggle.click();

  const logoutButton = dropdownToggle.$("//*[contains(text(), 'Logout')]");
  await logoutButton.click();

  await browser.keys("enter");
};

export { logout };
