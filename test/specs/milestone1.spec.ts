import { expect } from '@playwright/test';
import config from '../playwright.config';
import { checkout, signup, validateMetadata, test } from '../helpers';

// Request context is reused by all tests in the file.
let apiContext;
let fan_name;
let fan_email;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://api.stripe.com',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Stripe-Version': '2022-08-01'
    },
  });
  var currentTime = new Date();
  fan_name = 'fan_name_' +  process.env.CHALLENGE_ID;  
  fan_email = fan_name + '@mail.com';
})

test.afterAll(async ({ }) => {
  // Dispose all responses.
  await apiContext.dispose();
});

test.describe('Milestone 1', () => {
  /**
   * Validate that Email Address and Display Name are required.
   */
  test('Email address and display name are required fields.:1.5', async ({ page, browser }) => {
    
    await signup(page, config.use?.baseURL + '/signup', '', '', true);

    // Validate Email Required Error
    const emailRequired = await page.locator('#paymentlink-error');
    await expect(emailRequired).not.toBeEmpty();
    // Fill [placeholder="Email Address"]
    await page.locator('#email').fill('demouser@mail.com');
    // Click button:has-text("Become a Seller")
    await page.locator('#submit').click();
    // Validate Display name is required
    const nameRequired = await page.locator('#paymentlink-error');
    await expect(nameRequired).not.toBeEmpty();
  });

  /**
   * Validate that Email Address entered is valid String format.
   */
  test('Email address is in the correct format.:1.6', async ({ page, browser }) => {
    await signup(page, config.use?.baseURL + '/signup', 'demouser', 'Demo username', true);

    // Validate Display name is required
    let nameRequired = await page.locator('#paymentlink-error');
    await expect(nameRequired).not.toBeEmpty();

    await signup(page, config.use?.baseURL + '/signup', 'incomplete@mail', 'Demo username', true);
    nameRequired = await page.locator('#paymentlink-error');
    await expect(nameRequired).not.toBeEmpty();
  });

  /**
   * Validate Error message is displayed correctly for invalid email.
   */
  test('Show an error if the email is invalid.:1.7', async ({ page, browser }) => {
    await signup(page, config.use?.baseURL + '/signup', 'incomplete@mail', 'Demo username', true);
    
    // Validate Display name is required
    const nameRequired = await page.locator('#paymentlink-error');
    await expect(nameRequired).not.toBeEmpty();
  });

  /**
   * Validate that Seller Link button is disabled while processing.
   */
  test('\'Get Seller Link\' is disabled when form is submitted.:1.8', async ({ page, browser }) => {
    await signup(page, config.use?.baseURL + '/signup', fan_email, fan_name, false);

    const submitButton = await page.locator('#submit');
    await submitButton.click();
    await expect(submitButton).toBeDisabled();
  });

  /**
   * Validate Product and Price Setup is correct using Challenge ID in URL
   */
  test('Validate the Product and Price Setup.:1.9.1', async ({ page, browser }) => {
    const productList = await apiContext.get(`/v1/products`, {
      params: {
        active: true,
        url: process.env.CHALLENGE_ID
      }
    });
    await expect(productList.ok()).toBeTruthy();
    
    let productId;
    let responseBody = JSON.parse(await(productList.text()));
    
    responseBody.data.forEach(element => {
      productId = element.id;
    });
    
    let foundMatch = false;
    const afrobeatlesPrice = await apiContext.get(`/v1/prices`, {
      params: {
        product: productId 
      }
    });
    responseBody = JSON.parse(await(afrobeatlesPrice.text()));
    responseBody.data.forEach(element => {
      productId = element.id;
      if (element.id != null &&
        element.unit_amount == 2500) {
        foundMatch = true;
      }
    });
    await expect(true).toEqual(foundMatch);
  });

  /**
   * Validate the Payment link displayed is valid by following checkout flow.
   */
  test('Get Seller Link should create a new Payment Link and display a new component with the copyable link.:1.9.2', async ({ page, browser }) => {
    await signup(page, config.use?.baseURL + '/signup', fan_email, fan_name, true);
    
    // Validate Display name is required
    const paymentLink = await page.locator('#payment-link');
    await expect(paymentLink).toContainText('https://buy.stripe.com/');
    let paymentLinkValue = (await paymentLink.innerText()).valueOf();
    await checkout(page, paymentLinkValue);
  });

  /**
   * Validate that existing Payment link is displayed when same user information is entered in sign up.
   */
  test('Show the Payment Link if the display name exists already.:1.10', async ({ page, browser }) => {
    await signup(page, config.use?.baseURL + '/signup', fan_email, fan_name, true);

    // Validate Display name is required
    var paymentLink = await page.waitForSelector('#payment-link');
    let paymentLinkValue = (await paymentLink.innerText()).valueOf();
    await checkout(page, paymentLinkValue);
    //Reenter same information again
    await signup(page, config.use?.baseURL + '/signup', fan_email, fan_name, true);
    // Validate Display name is required
    var newPaymentLink = await page.waitForSelector('#payment-link');
    let newPaymentLinkValue = (await newPaymentLink.innerText()).valueOf();
    await expect(newPaymentLinkValue).toEqual(paymentLinkValue);
  });

  /**
   * Validate that Fan's information is passed as metadata in the Payment Link
   */
  test('Payment Link has the fan\'s username and email as the metadata.:1.11', async ({ page, browser }) => {
    await signup(page, config.use?.baseURL + '/signup', fan_email, fan_name, true);

    // Validate Display name is required
    const paymentLink = await page.locator('#payment-link');
    await expect(paymentLink).toContainText('https://buy.stripe.com/');
    await validateMetadata(apiContext, fan_name, fan_email);
  });

});