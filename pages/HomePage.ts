import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';




export class HomePage extends BasePage {
 
  constructor(page: Page) {
    super(page);

  }

  async navigateToHomePage(){
    await this.page.goto('');
  }

 


}