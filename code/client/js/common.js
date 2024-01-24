/** Common helpers used on multiple pages */ 

/**
 * Sets the visual display of a page to show that a request
 * to the server is being processed. If a spinner is found on the page
 * it will be shown, and the submit button will be disabled. 
 * If called with processing set to false the spinner will be hidden and
 * the submit buttons will be enabled.
 * @param {boolean} processing true if processing
 */
export function setProcessing(processing){
  let spinner = document.getElementById("spinner");
  if (spinner) {
    if (processing)
    {
      spinner.style.display = "block";  
    }
    else {
      spinner.style.display = "none";
    }
  }

  let submitBtn = document.getElementById("submit");
  if (submitBtn) {
    if (processing) {
      submitBtn.disabled = true;
    }
    else {
      submitBtn.disabled = false;
    }
  } 
}

// eslint-disable-next-line no-useless-escape
export const emailPattern = "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

/**
 * Returns a cents based price to a dollars
 * @param {string} price an amount in cents
 * @param {boolean} decimal sets the price to include 2 decimal places
 * @returns 
 */
export const getPriceDollars = (price, decimal = false) => {
  if (decimal) {
    price = Number(price / 100.0).toFixed(2);
  } else {
    price = Math.round(price / 100.0);
  }
  return "$" + price;
};