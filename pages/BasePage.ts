import { Page, Locator } from '@playwright/test';

export class BasePage {
  page: Page;
  homeButton: Locator;
  aboutUsButton: Locator;
  ourCompanyLink: Locator;
  valuesLink: Locator;
  nav: Locator; 
  servicesButton: Locator;
  contactUsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = this.page.locator('nav#site-navigation');
    this.homeButton = this.nav.getByRole('link', { name: 'Home' });
    this.aboutUsButton = this.nav.locator('#menu-item-5815'); // in the test make sure to hover to reveal the 2 options. 
    this.ourCompanyLink = this.aboutUsButton.getByRole('link', { name: 'Our Company' });
    this.valuesLink = this.aboutUsButton.getByRole('link', { name: 'Core Values and Vision' });
    this.servicesButton = this.nav.getByRole('link', { name: 'Services' });
    this.contactUsButton = this.nav.getByRole('link', { name: 'Contact us' });
  }
}