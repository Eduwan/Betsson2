import { test, expect, request } from '@playwright/test';

test.describe('Petstore API - POST /pet/{petId}', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://petstore.swagger.io/#/',
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('should update a pet with form data', async () => {
    const petId = 12345;

    const response = await apiContext.post(`/pet/${petId}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        name: 'UpdatedPetName',
        status: 'sold',
      },
    });

    // ✅ Assertions
    expect(response.status()).toBe(200);

    const responseText = await response.text();
    expect(responseText).toContain('ok'); // API returns plain text "ok"
  });
});