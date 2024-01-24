## Milestone 1: Help fans sell merch

The first step of the plan is giving our fans credit for the payments they make happen.  Our previous developer told us that Stripe's Payment Links would be a good fit -- one URL that can be used over and over to complete a specific purchase, like buying an Afrobeatles t-shirt.  We're planning to give each fan their own link, then they can spread it to their community on social media.

### Requirements

Our previous developer set up most of this flow, we're just missing the Stripe integration.

1. **Finish the provisioning service**
    - When the app turns on, it should make sure there's a Stripe Product and Price for the Afrobeatles t-shirt.  
    - If one doesn't already exist, then it should create one.

2. **Finish up the `POST /create-payment-link` endpoint**
    - Given an email and a display name, create a Payment Link which sells our t-shirt.  Our previous developer recommended putting that info in the metadata, put it under `fan_name` and `fan_email`.
    - If a user has requested a link with their email before, they should get the same link back again.
    
3. **Hook up the form**
    - Make sure the user includes both an email and display name, then submit it to the new endpoint.
    - Once the Payment Link is returned, display it for the user in a copy-pasteable box.  The UI for this has already been written, you should just need to hook it up to the Stripe integration.


_Test locally by [setting up Playwright](../test/README.md), starting your application's client/server, and then running `npx playwright test ./specs/milestone1.spec.ts` from the repo's `./test` directory._
