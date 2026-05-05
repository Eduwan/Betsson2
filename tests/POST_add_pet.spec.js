import { test, expect } from '@playwright/test';
import { pets } from './data/pets';

pets.forEach((pet) => {
  test(`Add pet: ${pet.name}`, async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet/', {
      data: pet,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }  
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(pet.name);
    expect(body.id).toBe(pet.id);
    expect(body.status).toBe('available');
  });
});