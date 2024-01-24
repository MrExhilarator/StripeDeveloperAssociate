_____
> _The **GitHub Integration Challenge** challenge is modeled after a consulting engagement with a make-believe client who gives you requirements for a Stripe integration.  Follow these steps to get started:_
> 1. _Read everything in this README, then take a look at the open pull request for the first milestone._
> 2. _Check out the `dev` branch to your machine, implement the requirements from the pull request, and then push back up._
> 3. _Look at the comment on the pull request for feedback, then start iterating._
___

<details> 
  <summary>You receive an email from usman@afrobeatles.com with subject: "Stripe Integration Project?" </summary>
  
  <br />
  
  Hello!  
  
  I'm the manager of the Afrobeatles, an up and coming afrobeats.  We want to create a competition among our fans to sell Afrobeat shirts to fund our upcoming tour.  The fan who sells the most shirts will get two free tickets to a concert of their choice.  We need a Stripe integration that lets our fans sign up to sell shirts and keeps track of who sells how much so we can award them at the end of the competition.  If you can help us, please see the attached project brief for more info about our implementation needs.
  
  Thank you,
  
  Usman

</details>

## Project Brief: Help the Afrobeatles use Payment Links

Afrobeatles is an Afrobeats group, our latest single "Hazardous" spent 3 weeks on the Hot 100.  We're starting a big tour in 6 months, and while we'll be selling tickets and merchandise as usual, we'd also like to experiment with "social selling".  We want to help our fans sell Afrobeatles t-shirts, then give the best selling fans two free tickets to any concert of their choice.  

We have a separate homepage, but we contracted a developer to come build out this new experience.  We'll build it into the main site if it works, but for now we just want to validate the social selling strategy.  We compared a few options and decided to build on Stripe, because Payment Links make it easy to give each of our fans their own "storefront".  If we end up getting good sales through it, then we might automatically qualify for some financing through Stripe Capital!

### Deliverables

Unfortunately, the contract developer who built most of this site had to change projects and couldn't implement the Stripe integration.  They left READMEs in `code` about how to run the app, and wrote up plans for the last two milestones:

1. **Creating Payment Links:** Allow fans to sign up as affiliates with an email and display name. Provide a Stripe Payment Link associated with that fan. 
2. **Leaderboard:** Generate a leaderboard out of all Payment Link sales per fan to determine who is in the lead at any given time.

We've already started a branch and pull request with their write up about the first milestone (also included in `/docs`). Once you push a commit that passes the test suite in GitHub, we'll automatically merge and open a new pull request for the next milestone.

_The test automation depends on GitHub Actions.  If the tests aren't immediately running, try checking their [status page](https://www.githubstatus.com/) to see if there is an incident._

### Working with the test suite

The previous developer's integration tests won't work anymore if your work changes:

1. Any of the server's existing routes.
2. Any of the classes and IDs from the rendered web page.

Please try to make only the changes necessary to satisfy the requirements.  Note that we're only concerned about how the site runs on the latest version of Google Chrome.  

### Managing Stripe API keys

We would prefer not to share credentials from our Stripe account, please use a personal account for test mode development.  Your integration should be "portable", ready to run on a new Stripe account if the API keys change in `code/server/.env`.  This includes both the server-side keys and the client-side keys.  

If any of your API keys are written directly into files, or drawn from anywhere other than `code/server/.env`, then we will be unable to check your work and you will not be able to proceed through the challenge.  If the project works on your machine but not in tests, try putting keys from a different Stripe account into that `code/server/.env` file and see if it keeps behaving.

_As always, you should **never** commit API secrets into source control. Make sure your Stripe account is (1) up to date with the latest API version, and (2) isn't operating an active business.  If necessary, you can easily [create new Stripe accounts](https://stripe.com/docs/multiple-accounts).  You do not need to activate the account, your integration will only be run in test mode._
- _Milestone 1 Started On Wed Jul  5 10:34:07 UTC 2023_
- _Milestone 2 Started On Sat Jul 15 08:51:16 UTC 2023_ 