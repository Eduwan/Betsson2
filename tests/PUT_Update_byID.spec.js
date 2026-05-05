import { test, expect } from '@playwright/test';

test('Update an existing pet', async ({ request }) => {
  const petId = 11;

  // Updated pet data
  const updatedPet = {
    id: petId,
    name: 'Beast Updated',
    photoUrls: ['https://example.com/dog2.jpg'],
    status: 'sold'
  };

  const updateResponse = await request.put(
    'https://petstore.swagger.io/v2/pet',
    {
      data: updatedPet,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );

  expect(updateResponse.status()).toBe(200);

  // Verify via GET
  const getResponse = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`,
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  expect(getResponse.status()).toBe(200);

  const body = await getResponse.json();

  expect(body.name).toBe('Beast Updated');
  expect(body.status).toBe('sold');
});


test('Update pet without ID should fail', async ({ request }) => {
  const invalidPet = {
    name: 'No ID Pet',
    photoUrls: ['https://example.com/dog.jpg'],
    status: 'available'
  };

  const response = await request.put(
    'https://petstore.swagger.io/v2/pet',
    { data: invalidPet }
  );

  expect(response.status()).toBeGreaterThanOrEqual(400);
});


test('Update non-existing pet', async ({ request }) => {
  const pet = {
    id: 999999999,
    name: 'Ghost Pet',
    photoUrls: ['https://example.com/ghost.jpg'],
    status: 'available'
  };

  const response = await request.put(
    'https://petstore.swagger.io/v2/pet',
    { data: pet,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );

  // Some APIs return 404, others create new resource (bad design but common)
  expect([200, 400, 404, 406]).toContain(response.status());
});

test('Missing Content-Type header', async ({ request }) => {
  const pet = {
    id: 14,
    name: 'Header Test',
    photoUrls: [],
    status: 'available'
  };

  const response = await request.put(
    'https://petstore.swagger.io/v2/pet',
    { data: pet } // no headers
  );

  expect(response.status()).toBeGreaterThanOrEqual(400);
});