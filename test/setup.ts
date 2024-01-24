import type { FullConfig } from '@playwright/test';

import * as dotenv from 'dotenv';

const setup = async (config: FullConfig) => {
  dotenv.config({path: `../code/server/.env`});
}

export default setup;