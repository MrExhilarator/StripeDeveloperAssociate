import { test, expect, Page } from '@playwright/test';

/**
 * Fills Credit card information on the standard checkout page and validates successful payment processing.
 * @param page 
 * @param checkoutLink 
 */
export const checkout = async (page:Page, checkoutLink) => {

  let testCardNumber = '4242 4242 4242 4242';
  let expDate = '12 / 29';
  let cvv = '123';

  await page.goto(checkoutLink);

  // Fill input[name="email"]
  var currentTime = Date.now();
  var demoUsername = 'demobuyeruser' + Math.floor(currentTime / 1000); 
  await page.locator('input[name="email"]').type(demoUsername + '@mail.com', {delay: 30});

  // Fill [placeholder="\31 234 1234 1234 1234"]
  // replace it with .type(value, {delay: 30})
  await page.locator('[placeholder="\\31 234 1234 1234 1234"]').type(testCardNumber, {delay: 30});

  // Fill [placeholder="MM \/ YY"]
  await page.locator('[placeholder="MM \\/ YY"]').type(expDate, {delay: 30});

  // Fill [placeholder="CVC"]
  await page.locator('[placeholder="CVC"]').type(cvv, {delay: 30});

  // Fill input[name="billingName"]
  await page.locator('input[name="billingName"]').type('Demo user', {delay: 30});

  // Fill [placeholder="ZIP"]
  await page.locator('[placeholder="ZIP"]').type('94080', {delay: 30});

  const phone = await page.locator('#phoneNumber').first();
  if (phone.isVisible()) {
    await phone.type('4242424242', {delay: 30});
  }

  // Click [data-testid="hosted-payment-submit-button"]
  await page.locator('[data-testid="hosted-payment-submit-button"]').click();
 
  // Click text=Thanks for your payment
  await page.locator('text=Thanks for your payment').click();

};
