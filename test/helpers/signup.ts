import { test, expect } from '@playwright/test';

/**
 * Navigates to Signup page and submits the sign up form.
 * @param page 
 * @param signuppagelink 
 * @param email 
 * @param username 
 */
export const signup = async (page, signuppagelink, email, username, submitclick) => {
  // Go directly to /signup
  await page.goto(signuppagelink);
  await expect(page).toHaveURL(signuppagelink);
  // Clear [placeholder="Email Address"]
  await page.locator('#email').type(email, {delay: 30});
  // Click [placeholder="Display Name"]
  await page.locator('#username').type(username, {delay: 30});
  if (submitclick) {
    await page.locator('#submit').click();
  }

};
