## Milestone 2: Show fans a working leaderboard

Now that fans can help sell our merch, we need to recognize the fans who are selling the most.  We'll give out 2 free tickets to the top selling fan each week, they can pick which show.  Our fans can get competitive, so they'll want a leaderboard showing who's in the lead.

We can plug Stripe's reports into a spreadsheet to calculate the weekly winner, so this leaderboard doesn't need to cover the entire payment history.  We just want fans to know who's been doing well recently!

### Requirements

As before, our previous developer set most of this up -- we're just missing the Stripe integration.  One key point they figured out is that metadata on Payment Links gets copied onto the Checkout Sessions that link produces.

1. **Calculate the fan rankings**
    - Fetch the last 500 payments by [listing Checkout Sessions](https://stripe.com/docs/api/checkout/sessions/list), that way you have the metadata with the fan's email and display name for each one.
    - Add up all of the payments attributed to each email address, producing an array of objects shaped like: `{ name: '...', email: '...', amount: 123 }`.

2. **Plug the results into the website**
    - Provide the above data to the client through a `GET /leaders` endpoint.  It doesn't need any arguments, and it should return the rankings inside an object: `{ sellers: [{...}, ...] }`.
    - Retrieve this data from your client and plug it into the Leaderboard.  The UI code has already been written, you should only need to use its helpers to add the data.


_Test locally by [setting up Playwright](../test/README.md), starting your application's client/server, and then running `npx playwright test ./specs/milestone2.spec.ts` from the repo's `./test` directory._