import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TIMEOUT } from '../utils/variables';

test.beforeEach('Navigate to Home Page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
});

test('Verify that home button is working as expected and navigating to the expected location', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.homeButton.click();
  await expect(page).toHaveURL('https://www.leadconsult.eu/');
  await expect(page).toHaveTitle(/LEAD Consult/i);
  await expect(page.getByRole('heading', { name: 'LEAD BY EXAMPLE' })).toBeVisible();
});

test('Verify that we are successfully navigated to the AboutUs page after clicking on the About Us (Our Company) button', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.aboutUsButton.hover();         //Here I am doing a hover, so I can reveal the submenu.
  await homePage.ourCompanyLink.click();
  await expect(page).toHaveURL('https://www.leadconsult.eu/about-us/');
  await expect(page).toHaveTitle(/About Us - LEAD Consult/i);
  const body = await page.locator('body').innerText();
   expect(body).toMatch(/team/i);
   expect(body).toMatch(/consulting/i);
});

test('Verify that we are successfully navigated to Services page after clicking on the Services button', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.servicesButton.click();
  await expect(page).toHaveURL('https://www.leadconsult.eu/services/');
  await expect(page).toHaveTitle(/Services - LEAD Consult/i);
  await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
});

