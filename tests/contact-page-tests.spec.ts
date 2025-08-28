import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';
const TIMEOUT: number = 5000;

test.beforeEach('Navigate to Contact Page', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.navigateToContactPage();
});

test('Contact page contains message field, email address, or send button', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.contactUsButton.click();
  await expect(contactPage.messageField).toBeVisible({ timeout: TIMEOUT });
  await expect(contactPage.messageField).toBeEnabled();
  await expect(contactPage.emailField).toBeVisible({ timeout: TIMEOUT });
  await expect(contactPage.emailField).toBeEnabled(); 
  await expect(contactPage.sendButton).toBeVisible({ timeout: TIMEOUT });
  await expect(contactPage.sendButton).toBeEnabled(); 
});

test("Contact form shows reCAPTCHA error when submitting without 'I'm not a robot' checked", async ({ page }) => {
  const contactPage = new ContactPage(page);
  await page.waitForTimeout(TIMEOUT); // I use this timeout because it takes about 2-3 seconds for the navigation to load, and if we start filling the fields before that, after refresh the fields remain empty.
  await contactPage.yourNameField.fill('Иван Иванов');
  await contactPage.emailField.fill('ivan.ivanov@gmail.com');
  await contactPage.messageField.fill('Иван Иванов тества тук.');
  await contactPage.acceptTermsCheckbox.check();
  await contactPage.sendButton.click();
  await page.waitForTimeout(TIMEOUT);
  await expect(contactPage.reCAPTCHAErrorMSG).toHaveText(/Please verify that you are not a robot./i, { timeout: TIMEOUT });
  await page.screenshot({ path: 'after-send.png', fullPage: true }); // I added a screenshot to make sure the page looks as expected: with the message 'Please verify that you are not a robot.'
});
