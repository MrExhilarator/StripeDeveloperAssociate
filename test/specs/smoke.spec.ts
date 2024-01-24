import { expect } from '@playwright/test';
import {test} from '../helpers';
import config from '../playwright.config';

test.describe('Smoke Test', () => {
  test('Sign up navigation works 1.3', async ({ page, browser }) => {
    await page.goto('/');
    // Click button:has-text("Become a Seller")
    await page.locator('button:has-text("Become a Seller")').click();
    await expect(page).toHaveURL(config.use?.baseURL + '/signup');
    // Click text=The Afrobeatles
    await page.getByRole('link', { name: 'The Afrobeatles' }).click();
    await expect(page).toHaveURL(config.use.baseURL?.toString());
    // Click text=View Leaderboard
    await page.locator('text=View Leaderboard').click();
    await expect(page).toHaveURL(config.use?.baseURL + '/leaderboard');
    // Click text=The Afrobeatles
    await page.getByRole('link', { name: 'The Afrobeatles' }).click();
    await expect(page).toHaveURL(config.use.baseURL?.toString());
    await page.goto('/');
    // Go directly to /signup
    await page.goto('/signup');
    await expect(page).toHaveURL(config.use?.baseURL + '/signup');
  });

  test('Leaderboard navigation works 1.4', async ({ page, browser }) => {
    await page.goto('/');
    // Click button:has-text("Become a Seller")
    await page.locator('button:has-text("Become a Seller")').click();
    await expect(page).toHaveURL(config.use?.baseURL + '/signup');
    // Click text=The Afrobeatles
    await page.getByRole('link', { name: 'The Afrobeatles' }).click();
    await expect(page).toHaveURL(config.use.baseURL?.toString());
    // Click text=View Leaderboard
    await page.locator('text=View Leaderboard').click();
    await expect(page).toHaveURL(config.use?.baseURL + '/leaderboard');
    // Click text=The Afrobeatles
    await page.getByRole('link', { name: 'The Afrobeatles' }).click();
    await expect(page).toHaveURL(config.use.baseURL?.toString());
    await page.goto('/');
    // Go directly to /leaderboard
    await page.goto('/leaderboard');
    await expect(page).toHaveURL(config.use?.baseURL + '/leaderboard');
  });
});