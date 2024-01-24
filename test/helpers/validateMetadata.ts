import { test, expect } from '@playwright/test';

/**
 * Validate Metadata information in Payment Link for the challenge
 * @param apiContext 
 * @param fan_name 
 * @param fan_email 
 */
export const validateMetadata = async (apiContext, fan_name, fan_email) => {
  let foundMatch = await getPaymentLinks(apiContext, fan_name, fan_email, null);
  await expect(true).toEqual(foundMatch);

};

export const getPaymentLinks = async (apiContext, fan_name, fan_email, starting_after_id) => {
  var paymentLinks;
  var foundMatch = false;
  if (starting_after_id != null ) {
    paymentLinks = await apiContext.get(`/v1/payment_links`, {params: {limit:100, active:'true', starting_after: starting_after_id}});
  } else {
    paymentLinks = await apiContext.get(`/v1/payment_links`, {params: {limit:100, active:'true'}});
  }
  expect(paymentLinks.ok()).toBeTruthy();
  const responseBody = await paymentLinks.json();
  responseBody.data.forEach(element => {
    if (element.metadata != null && 
        element.metadata.fan_email == fan_email && 
        element.metadata.fan_name == fan_name) {
      foundMatch = true;
    }
    starting_after_id = element.id;
  });
  if (responseBody.has_more && foundMatch == false) {
    foundMatch = await getPaymentLinks(apiContext, fan_name, fan_email, starting_after_id);
  }
  return foundMatch;
};
