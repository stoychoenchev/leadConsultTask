import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
   messageField: Locator;
   emailField: Locator;
   sendButton: Locator;
   yourNameField: Locator;
   kontaktForm: Locator;
   acceptTermsCheckbox: Locator;
   reCAPTCHAErrorMSG: Locator;
   
  constructor(page: Page) {
    super(page);
    this.kontaktForm = page.getByRole('form', { name: 'Kontaktformular' }); // I am getting the form to isolate all the fields
    // I am using the regex, to ignore any leading whitespace
    this.yourNameField = this.kontaktForm.getByRole('textbox', { name: /\s*Your Name\*/i }); 
    this.messageField = this.kontaktForm.getByRole('textbox', { name: /\s*Your Message\*/i });
    this.emailField = this.kontaktForm.getByRole('textbox', { name: /\s*Your Email\*/i });
    this.acceptTermsCheckbox = this.kontaktForm.getByRole('checkbox', { name: /I agree and allow LEAD Consult/i });
    this.sendButton = this.kontaktForm.getByRole('button', { name: 'Send' });
    this.reCAPTCHAErrorMSG = this.kontaktForm.getByText("Please verify that you are not a robot.");
  }

    async navigateToContactPage(){
    await this.page.goto('/contact-us/');
  }
}