## Running the test suite

1. From this directory, run `npm i` to install Playwright's npm dependencies.
2. Run `npx playwright install --with-deps chromium` to install Playwright's copy of Chromium.
3. Check the current milestone's pull request to find the command to run its test suite.


Note: Playwright installs browsers into a shared system directory by default.  If you can only run programs from a specific directory, then you can tell Playwright to install browsers within this project by setting the following environment variable before running the commands above: `export PLAYWRIGHT_BROWSERS_PATH=0`.