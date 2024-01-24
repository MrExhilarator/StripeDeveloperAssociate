import { expect } from '@playwright/test';
import config from '../playwright.config';
import { signup, checkout, test } from '../helpers';

// Request context is reused by all tests in the file.
let apiContext;
let fan_name;
let fan_email;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://api.stripe.com',
    extraHTTPHeaders: {
      // Add authorization token to all requests.
      'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Stripe-Version': '2022-08-01'
    },
  });
  fan_name = 'fan_name_' +  process.env.CHALLENGE_ID;  
  fan_email = fan_name + '@mail.com';
})

test.afterAll(async ({ }) => {
  // Dispose all responses.
  await apiContext.dispose();
});

test.describe('Milestone 2', () => {
  /**
   * Check that the spinner transitions to the leaderboard component after the data loads.
   */
  test('GET endpoint for retrieving the server\'s list of purchases.:2.1', async ({ page }) => {
    // Go directly to /leaderboard
    await page.goto('/leaderboard');
    let spinner = await page.locator('#spinner');
    let spinnerCount = await spinner.count();
    await expect(spinnerCount).toEqual(1);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('div.summary-row'); // Wait for the leaderboard to load
    let summaryTable = await page.locator('div.summary-row');
    let rowCount = await summaryTable.count()
    await expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  /**
   * Place multiple orders to a Payment Link for a fan and check the output of /leaerboard.
   */
  test('Fan sale totals are calculated correctly.:2.2', async ({ page, browser }) => {
    
    // Payment Link can take >20s end-to-end, allow 60s for this test
    test.setTimeout(60 * 1000)

    await signup(page, config.use?.baseURL + '/signup', fan_email, fan_name, true);

    const paymentLink = await page.locator('#payment-link');
    await expect(paymentLink).toContainText('https://buy.stripe.com/');
    let paymentLinkValue = (await paymentLink.innerText()).valueOf();
    await checkout(page, paymentLinkValue);


    const extraContext = await browser.newContext();
    const extraPage = await extraContext.newPage();
    await checkout(extraPage, paymentLinkValue);

    // Go directly to /leaderboard
    await page.goto('/leaderboard');
    let spinner = await page.locator('#spinner');
    let spinnerCount = await spinner.count();
    await expect(spinnerCount).toEqual(1);
    await page.waitForSelector('div.summary-row'); // Wait for the leaderboard to load
    let summaryTable = await page.locator('div.summary-row');
    let summaryTableRowCount = await summaryTable.count();
    await expect(summaryTableRowCount).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < summaryTableRowCount; ++i) {
        let row =  await summaryTable.nth(i);
        let foundfanName = await row.locator('div.summary-name').innerHTML();
        if (foundfanName == fan_name) {
            let fanSaleAmount = await row.locator('div.summary-sale').innerHTML();
            let checkAmount = 50.00;
            await expect(Number(fanSaleAmount.substring(1))).toBeGreaterThanOrEqual(checkAmount);  
        }
    }     
  });

  /**
   * Loop through the sellers array to compare amounts.
   */
  test('Leaderboard is ordered greatest-to-least.:2.3', async ({ page, browser }) => {

    // Payment Link can take >20s end-to-end, allow 60s for this test
    test.setTimeout(60 * 1000)
    
    await signup(page, config.use?.baseURL + '/signup', fan_email, fan_name, true);

    const paymentLink = await page.locator('#payment-link');
    await expect(paymentLink).toContainText('https://buy.stripe.com/');
    let paymentLinkValue = (await paymentLink.innerText()).valueOf();
    await checkout(page, paymentLinkValue);
    
    const extraContext = await browser.newContext();
    const extraPage = await extraContext.newPage();
    await checkout(extraPage, paymentLinkValue);

    // Go directly to /leaderboard
    await page.goto('/leaderboard', {waitUntil: 'networkidle'});
    await page.waitForSelector('div.summary-row'); // Wait for the leaderboard to load
    let summaryTable = await page.locator('div.summary-row');
    let summaryTableRowCount = await summaryTable.count();
    await expect(summaryTableRowCount).toBeGreaterThanOrEqual(1);
    let prevAmount = 100000000.00;
    for (let i = 0; i < summaryTableRowCount; ++i) {
        let row =  await summaryTable.nth(i);
        let saleAmount = await row.locator('div.summary-sale').innerHTML();
        var saleAmountNumber: number = +saleAmount.substring(1);
        await expect(prevAmount).toBeGreaterThanOrEqual(saleAmountNumber);
        prevAmount = saleAmountNumber;
    }
  });
});