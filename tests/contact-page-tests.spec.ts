import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';
import { TIMEOUT } from '../utils/variables';

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
  await expect(contactPage.yourNameField).toBeVisible({ timeout: TIMEOUT });
  await expect(contactPage.emailField).toBeVisible({ timeout: TIMEOUT });
  await expect(contactPage.messageField).toBeVisible({ timeout: TIMEOUT });
  await expect(contactPage.acceptTermsCheckbox).toBeVisible({ timeout: TIMEOUT });
  await expect(contactPage.sendButton).toBeVisible({ timeout: TIMEOUT });
  await contactPage.yourNameField.fill('Иван Иванов');
  await contactPage.emailField.fill('ivan.ivanov@gmail.com');
  await contactPage.messageField.fill('Иван Иванов тества тук.');
  await contactPage.acceptTermsCheckbox.click();
  await contactPage.sendButton.click();
  await expect(contactPage.responseOutput).toBeVisible({ timeout: TIMEOUT * 6 });
  await expect(contactPage.responseOutput).toHaveText(/One or more fields have an error/i, { timeout: TIMEOUT });
  await expect(contactPage.reCAPTCHAErrorMSG).toHaveText(/Please verify that you are not a robot./i, { timeout: TIMEOUT * 6 });
});
