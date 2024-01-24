import { setProcessing, getPriceDollars } from "./common.js";

/**
 * Generates a row for the leaderboard table displaying the fan's name 
 * and total amount sold. 
 * @param {string} name - the sellers name
 * @param {string} amount - the total amount sold through their Payment Link 
 * @returns A div generated from the template element within the leaderboard.html. 
 */
const showLeaderBoardRow = function ({ name, amount }) {
  //use template to create a div for the given
  const price = getPriceDollars(amount, true);
  const rowTemplate = document.querySelector('#seller-summary');
  const rowDiv = rowTemplate.content.firstElementChild.cloneNode(true);
  let nameDiv = rowDiv.getElementsByClassName('summary-name')[0];
  nameDiv.textContent = name;
  let priceDiv = rowDiv.getElementsByClassName('summary-sale')[0];
  priceDiv.textContent = price;
  return rowDiv;
}

/**
 * Builds the leaderboard table, generating a row for each seller. 
 * @param {} sellers 
 */
const showSellers = function (sellers) {
  let sellerTable = document.getElementById("summary-table");
  sellers.forEach((seller) => {
    let row = showLeaderBoardRow({
      name: seller.name,
      email: seller.email,
      amount: seller.amount
    });
    sellerTable.append(row);
  });
  setProcessing(false);
}

/**
 * Shows the leaderboard.html page by 
 */
const showPage = async function (){
  /** 
   * TODO: Integrate Stripe
   * Milestone 2: Complete this function to display the leaderboard of sellers. 
   */
  const leaderBoard = await getLeaderboard();
  showSellers(leaderBoard.sellers);
}

/**
 * Make call to server to get sorted leaderboard
  * @returns {Array} sellers - Returns Seller array with name, email, and total amount that is sorted desc by total amount
 */
const getLeaderboard = async () => {
  /** 
   * TODO: Integrate Stripe
   * Milestone 2: complete this function to fetch the fans to display on the 
   * leaderboard. 
   */
  const url = 'http://localhost:4242/leaders';

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  setProcessing(true);
  const leaderBoard = await fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error while fetching leaderboard');
      }
    })
    .catch(error => {
      setError(error.message);
    })
  return {
    sellers: leaderBoard.sort((a,b) => b.amount - a.amount),
  }
};

window.addEventListener('DOMContentLoaded', (event) => {
  showPage();
});