import { test, expect } from '@playwright/test';

test('Update an existing pet', async ({ request }) => {
  const petId = 11;



  // 2. Update pet data
  const updatedPet = {
    id: petId,
    name: 'Beast Updated',
    photoUrls: ['https://example.com/dog.jpg'],
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

  // 3. Verify via GET
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