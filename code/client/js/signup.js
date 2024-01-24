import {emailPattern, setProcessing} from "./common.js";

/**
 * Handle the user completing the registration form. 
 */
const handleClick = async function (event)
{
  event.preventDefault();
  try {
    const url = 'http://localhost:4242/create-payment-link';
    const params = {
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    };
    //console.log(params);
    setProcessing(true);
    if (!params.email || !params.username) {
      //console.log("if no email or username");
      throw new Error('Email and Username are required');
    }
    const paymentLink = await fetch(url, options)
      .then(response => {
        if (response.ok) {
          //console.log("if response was ok", response.json().paymentLink);
          setProcessing(false);
          return response.json();
        } else if (response.status === 400) {
          throw new Error('Invalid email ID');
        }
      })
      .catch(error => {
        setProcessing(false);
        setError(error.message);
      })
    if (paymentLink?.url) {
      showSignupComplete(paymentLink.url);
    }
  } catch (error) {
    //console.log("inside catch", JSON.stringify(error));
    setProcessing(false);
    setError(error.message);
  }
  /** 
   * TODO: Integrate Stripe
   * Milestone 1: Complete this function to return a payment for the fan 
   * once they have filled out the registration form. Their email and display name 
   * are both required.  
   * 
   * You can use the setProcessing() in common.js
   * to help control the UX during calls to the server, and setError() to display
   * any errors. 
   * 
   * After you've received the Payment Link from the server 
   * call showSignupComplete to display the seller's Payment Link.  
   */
}

/** 
 * Helper function to show an error message on the page. 
 * @param {string} errorMsg - msg to be displayed
 */
const setError = function (errorMsg) {
  const errDiv = document.getElementById('paymentlink-error');
  const messageElement = errDiv.getElementsByTagName("p")[0];
  messageElement.textContent = errorMsg;
  errDiv.style.display = 'block';
}

/**
 * @returns the Payment Link displayed on the page. 
 */
const getPaymentLink = function () {
  let paymentLinkDisplay = document.getElementById("payment-link");
  return paymentLinkDisplay.textContent;
}

/**
 * Displays the provided Payment Link 
 * @param {string} paymentLinkUrl
 */
const setPaymentLink = function (paymentLinkUrl) {
  let paymentLinkDisplay = document.getElementById("payment-link");
  paymentLinkDisplay.textContent = paymentLinkUrl;
}

/**
 * Replaces the registration form with a sign up complete message
 * and the seller's Payment Link. 
 * @param {string} paymentLinkUrl 
 */
const showSignupComplete = function (paymentLinkUrl) {
  setPaymentLink(paymentLinkUrl);
  togglePaymentLinkDiv(true);
  let formWrapper = document.getElementById("form-div");
  formWrapper.style.display = "none";
}

/**
 * Toggles the div showing a Payment Link either showing or hidding it. 
 * @param {boolean} display 
 */
const togglePaymentLinkDiv = function (display) {
  let paymentLinkWrapper = document.getElementById("paymentlink-wrapper");
  if (display) {
    paymentLinkWrapper.style.display = "block";
    paymentLinkWrapper.scrollIntoView();
  } else {
    paymentLinkWrapper.style.display = "none";
  }
}

/**
 * Copy the Payment Link to the clipboard. 
 */
 const copyToClipboard = async () => {
  const paymentLink = getPaymentLink();
  navigator.clipboard.writeText(paymentLink);
};

window.addEventListener('DOMContentLoaded', (event) => {
  togglePaymentLinkDiv(false);
  const submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', handleClick);
  const emailInput = document.getElementById('email');
  emailInput.setAttribute('pattern', emailPattern);
  const clipboardBtn = document.getElementById('copy-button');
  clipboardBtn.addEventListener('click', copyToClipboard);
  const errorDivs = document.getElementById('paymentlink-error');
  errorDivs.style.display = 'none';
});



