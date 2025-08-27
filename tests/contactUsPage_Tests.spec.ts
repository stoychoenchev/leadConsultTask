import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test('Contact page contains message field, email address, or send button', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.navigateToContactPage();

  await contactPage.contactUsButton.click();

  const messageField = contactPage.messageField;
  const emailField = contactPage.emailField;
  const sendButton = contactPage.sendButton;

  await expect(messageField).toBeVisible();
  await expect(messageField).toBeEnabled(); // Included to be enabled to make sure that the field is interactable

  await expect(emailField).toBeVisible();
  await expect(emailField).toBeEnabled(); // Included to be enabled to make sure that the field is interactable 

  await expect(sendButton).toBeVisible();
  await expect(sendButton).toBeEnabled(); // Included to be enabled to make sure that the button is interactable

});

test("Contact form shows reCAPTCHA error when submitting without 'I'm not a robot' checked", async ({ page }) => {
  const contactPage = new ContactPage(page);
  const yourNameField = contactPage.yourNameField;
  const emailField = contactPage.emailField;
  const messageField = contactPage.messageField;
  const agreeButton = contactPage.acceptTermsCheckbox;
  const sendButton = contactPage.sendButton;
  const reCAPTCHAErrorMSG = contactPage.reCAPTCHAErrorMSG;

  await contactPage.navigateToContactPage();
  await page.waitForTimeout(5000); // Използвам този таймаут, тъй като отнема около 2-3 секунди, за да се зареди навигацията и ако започнем да попълваме полетата преди това, след рефреша полетата остават празни.
  
  await yourNameField.fill('Иван Иванов');
  await emailField.fill('ivan.ivanov@gmail.com');
  await messageField.fill('Иван Иванов тества тук.');
  await agreeButton.check();
  await sendButton.click();
  await page.waitForTimeout(5000); 
  await expect(reCAPTCHAErrorMSG).toBeVisible({ timeout: 5000 });
  await expect(reCAPTCHAErrorMSG).toHaveText(/Please verify that you are not a robot./i, { timeout: 5000 });
  await page.screenshot({ path: 'after-send.png', fullPage: true }); //Добавих скрийншот, за да се уверя, че страницата изглежда по начина по който очаквам: със съобщението 'Please verify that you are not a robot.'
});