import { test, expect } from '@playwright/test';

const baseURL = 'https://automationintesting.online/';
const apiURL = `${baseURL}api/message`;

test.describe('Contact Us Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('should submit contact form successfully', async ({ page }) => {
    const contactName = 'John Doe';
    const contactEmail = 'johndoe@example.com';
    const contactPhone = '0812345678900';
    const contactSubject = 'Lorem ipsum dolor sit amet';
    const contactMessage =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    // Fill in the contact form
    await page.getByTestId('ContactName').fill(contactName);
    await page.getByTestId('ContactEmail').fill(contactEmail);
    await page.getByTestId('ContactPhone').fill(contactPhone);
    await page.getByTestId('ContactSubject').fill(contactSubject);
    await page.getByTestId('ContactDescription').fill(contactMessage);

    // Submit the form and wait for the API response
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url() === apiURL &&
        response.request().method() === 'POST'
    );

    await page.getByRole('button', { name: 'Submit' }).click();

    const response = await responsePromise;

    // Verify API response
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ success: true });

    // Verify success message
    await expect(
      page.getByRole('heading', {
        name: `Thanks for getting in touch ${contactName}!`,
      })
    ).toBeVisible();

    await expect(
      page.getByText("We'll get back to you about")
    ).toBeVisible();

    await expect(page.getByText(contactSubject)).toBeVisible();

    await expect(
      page.getByText('as soon as possible.')
    ).toBeVisible();
  });

  test('should show validation errors when submitting an empty form', async ({
    page,
  }) => {
    const expectedErrors = [
      'Message must be between 20 and 2000 characters.',
      'Phone may not be blank',
      'Phone must be between 11 and 21 characters.',
      'Email may not be blank',
      'Subject must be between 5 and 100 characters.',
      'Message may not be blank',
      'Subject may not be blank',
      'Name may not be blank',
    ];

    // Submit the form without filling in any fields
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url() === apiURL &&
        response.request().method() === 'POST'
    );

    await page.getByRole('button', { name: 'Submit' }).click();

    const response = await responsePromise;

    // Verify API status code
    expect(response.status()).toBe(400);

    // Verify API response body without depending on error order
    const responseBody = await response.json();

    expect(responseBody).toHaveLength(expectedErrors.length);

    for (const error of expectedErrors) {
      expect(responseBody).toContain(error);
    }

    // Verify validation messages displayed on the page
    for (const error of expectedErrors) {
      await expect(
        page.getByText(error, { exact: true })
      ).toBeVisible();
    }
  });
});