import { test, expect } from '@playwright/test';

test('Get pet by existing ID', async ({ request }) => {
  // First: create a pet (or reuse an existing ID)
  const petId = 11;


  const response = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`,
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  // Assertions
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(petId);
  expect(body.name).toBe('Beast');
  expect(body.status).toBe('available');
});


test('Get pet with invalid ID', async ({ request }) => {
  // First: create a pet (or reuse an existing ID)
  const petId = 117780000047583892575;


  // Now: GET the pet by ID
  const response = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`,
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  // Assertions
  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body.message).toContain('NumberFormatException');

});


test('Get pet by non-existing ID', async ({ request }) => {
  // First: create a pet (or reuse an existing ID)
  const petId = 999999998;


  // Now: GET the pet by ID
  const response = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`,
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  // Assertions
  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body.message).toBe('Pet not found');

});