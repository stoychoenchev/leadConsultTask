import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test.beforeEach('Navigate to Contact Page', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.navigateToContactPage();
});

test('Contact page contains message field, email address, or send button', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.contactUsButton.click();
  await expect(contactPage.messageField).toBeVisible();
  await expect(contactPage.messageField).toBeEnabled();
  await expect(contactPage.emailField).toBeVisible();
  await expect(contactPage.emailField).toBeEnabled(); 
  await expect(contactPage.sendButton).toBeVisible();
  await expect(contactPage.sendButton).toBeEnabled(); 
});

test("Contact form shows reCAPTCHA error when submitting without 'I'm not a robot' checked", async ({ page }) => {
  const contactPage = new ContactPage(page);
  await page.waitForTimeout(5000); // Използвам този таймаут, тъй като отнема около 2-3 секунди, за да се зареди навигацията и ако започнем да попълваме полетата преди това, след рефреша полетата остават празни.
  await contactPage.yourNameField.fill('Иван Иванов');
  await contactPage.emailField.fill('ivan.ivanov@gmail.com');
  await contactPage.messageField.fill('Иван Иванов тества тук.');
  await contactPage.acceptTermsCheckbox.check();
  await contactPage.sendButton.click();
  await page.waitForTimeout(5000);
  await expect(contactPage.reCAPTCHAErrorMSG).toHaveText(/Please verify that you are not a robot./i, { timeout: 5000 });
  await page.screenshot({ path: 'after-send.png', fullPage: true }); //Добавих скрийншот, за да се уверя, че страницата изглежда по начина по който очаквам: със съобщението 'Please verify that you are not a robot.'
});
