const logout = async () => {
  return await browser.deleteCookies();
};

export { logout };
