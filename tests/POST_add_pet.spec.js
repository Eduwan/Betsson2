import { test, expect } from '@playwright/test';

test('Add a new pet', async ({ request }) => {
  const newPet = {
    id: 11, // unique ID
    name: 'Beast',
    category: {
      id: 1,
      name: 'Dogs'
    },
    photoUrls: ['https://example.com/dog.jpg'],
    tags: [
      {
        id: 3,
        name: 'ugly'
      }
    ],
    status: 'available'
  };

  const response = await request.post('https://petstore.swagger.io/v2/pet/', {
    data: newPet,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  console.log(await response.text());

  // Assertions
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.name).toBe(newPet.name);
  expect(responseBody.id).toBe(newPet.id);
  expect(responseBody.status).toBe('available');
});